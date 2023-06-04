package com.jinkyumpark.library.membership.appleWallet;

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

    @Value("${apple.wallet.identifier.pass-type}")
    private String passTypeIdentifier;
    @Value("${apple.wallet.identifier.team}")
    private String teamIdentifier;
    @Value("${apple.wallet.identifier.organization-name}")
    private String organizationName;
    @Value("${apple.wallet.secret.pass-key}")
    private String passKeyPassword;

    @Value("${apple.wallet.path.private-certificate}")
    private String privateCertificatePath;
    @Value("${apple.wallet.path.apple-certificate}")
    private String appleCertificatePath;
    @Value("${apple.wallet.path..template}")
    private String templatePath;

    @SneakyThrows
    public PKPass getAppleWalletJson(Long membershipId) {
        Membership membership = membershipService.getLibraryMembershipById(membershipId);

        PKBarcode barcode = PKBarcode.builder()
                .format(PKBarcodeFormat.PKBarcodeFormatCode128)
                .altText(addSpacesToNumber(membership.getNumber(), 4))
                .message(addSpacesToNumber(membership.getNumber(), 4))
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

        String primaryColor = "#3ab56d";
        String textColor = "rgb(255, 255, 255)";
        String logoText = membership.getName();
        String description = membership.getName();
        String serialNumber = "booksitout-library-membership-" + membershipId;

        return PKPass.builder()
                .formatVersion(1)

                .pass(storePass)
                .barcodes(List.of(barcode))

                .passTypeIdentifier(passTypeIdentifier)
                .teamIdentifier(teamIdentifier)
                .organizationName(organizationName)

                .serialNumber(serialNumber)
                .description(description)
                .logoText(logoText)

                .backgroundColor(primaryColor)
                .foregroundColor(textColor)
                .labelColor(textColor)

                .sharingProhibited(true)
//                .webServiceURL(new URL("https://booksitout.com"))
//                .userInfo()
//                .locations()
//                .maxDistance()

                .build();
    }

    public byte[] getAppleWalletPass(PKPass pkPass) throws IOException, CertificateException, PKSigningException {
        PKSigningInformation pkSigningInformation = new PKSigningInformationUtil()
                .loadSigningInformationFromPKCS12AndIntermediateCertificate(
                        privateCertificatePath,
                        passKeyPassword,
                        appleCertificatePath
                );

        IPKPassTemplate pkPassTemplateFolder = new PKPassTemplateFolder(templatePath);

        return pkFileBasedSigningUtil.createSignedAndZippedPkPassArchive(pkPass, pkPassTemplateFolder, pkSigningInformation);
    }

    public static String addSpacesToNumber(String number, int interval) {
        StringBuilder formattedNumber = new StringBuilder();

        int length = number.length();
        for (int i = 0; i < length; i++) {
            if (i % interval == 0) {
                formattedNumber.append(' ');
            }
            formattedNumber.append(number.charAt(i));
        }

        return formattedNumber.toString();
    }

}
