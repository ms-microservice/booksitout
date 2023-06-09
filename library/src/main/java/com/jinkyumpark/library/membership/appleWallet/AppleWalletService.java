package com.jinkyumpark.library.membership.appleWallet;

import com.jinkyumpark.library.common.Utils;
import com.jinkyumpark.library.membership.Membership;
import com.jinkyumpark.library.membership.MembershipService;
import de.brendamour.jpasskit.PKBarcode;
import de.brendamour.jpasskit.PKField;
import de.brendamour.jpasskit.PKPass;
import de.brendamour.jpasskit.enums.PKBarcodeFormat;
import de.brendamour.jpasskit.enums.PKPassType;
import de.brendamour.jpasskit.passes.PKGenericPass;
import de.brendamour.jpasskit.passes.PKGenericPassBuilder;
import de.brendamour.jpasskit.signing.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.cert.CertificateException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AppleWalletService {

    private final MembershipService membershipService;
    private final PKFileBasedSigningUtil pkFileBasedSigningUtil;
    private final AppleWalletProperties appleWalletProperties;

    @SneakyThrows
    public PKPass getAppleWalletJson(Long membershipId) {
        Membership membership = membershipService.getLibraryMembershipById(membershipId);

        PKBarcode barcode = PKBarcode.builder()
                .format(PKBarcodeFormat.PKBarcodeFormatCode128)
                .altText(Utils.addSpacesToNumber(membership.getNumber(), 4))
                .message(Utils.addSpacesToNumber(membership.getNumber(), 4))
                .messageEncoding(StandardCharsets.UTF_8)
                .build();

        PKGenericPassBuilder storePass = PKGenericPass.builder()
                .passType(PKPassType.PKStoreCard)
                .primaryField(PKField.builder()
                        .key("balance")
                        .label("")
                        .value("")
                        .build())
                .headerField(PKField.builder()
                        .key("store")
                        .value("책잇아웃")
                        .build())
                .auxiliaryField(PKField.builder()
                        .key("rent-status")
                        .label("대출 현황")
                        .value("5권 / 5권")
                        .build())
                .backField(PKField.builder()
                        .key("info")
                        .label("정보")
                        .value("책잇아웃에서 발급받은 도서관 회원증이에요. booksitout.com 에서 수정하실 수 있어요.")
                        .build());

        String logoText = membership.getName();
        String description = membership.getName();
        String primaryColor = "#3ab56d";
        String textColor = "rgb(255, 255, 255)";
        String serialNumber = "booksitout-library-membership-" + membershipId;

        return PKPass.builder()
                .formatVersion(1)

                .pass(storePass)
                .barcodes(List.of(barcode))

                .passTypeIdentifier(appleWalletProperties.getIdentifier().getPassTypeIdentifier())
                .teamIdentifier(appleWalletProperties.getIdentifier().getTeamIdentifier())
                .organizationName(appleWalletProperties.getIdentifier().getOrganizationName())

                .serialNumber(serialNumber)
                .description(description)
                .logoText(logoText)

                .backgroundColor(primaryColor)
                .foregroundColor(textColor)
                .labelColor(textColor)

                .sharingProhibited(true)

                .build();
    }

    public byte[] getAppleWalletPass(PKPass pkPass) throws PKSigningException, CertificateException, IOException {
        PKSigningInformation pkSigningInformation = new PKSigningInformationUtil()
                .loadSigningInformationFromPKCS12AndIntermediateCertificate(
                        appleWalletProperties.getPath().getPrivateCertificatePath(),
                        appleWalletProperties.getSecret(),
                        appleWalletProperties.getPath().getPrivateCertificatePath()
                );

        IPKPassTemplate pkPassTemplateFolder = new PKPassTemplateFolder(appleWalletProperties.getPath().getTemplatePath());

        return pkFileBasedSigningUtil.createSignedAndZippedPkPassArchive(pkPass, pkPassTemplateFolder, pkSigningInformation);
    }

}
