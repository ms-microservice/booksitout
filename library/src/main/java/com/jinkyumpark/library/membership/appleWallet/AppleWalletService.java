package com.jinkyumpark.library.membership.appleWallet;

import com.jinkyumpark.library.membership.LibraryMembership;
import com.jinkyumpark.library.membership.LibraryMembershipService;
import de.brendamour.jpasskit.PKBarcode;
import de.brendamour.jpasskit.PKPass;
import de.brendamour.jpasskit.enums.PKBarcodeFormat;
import de.brendamour.jpasskit.enums.PKPassType;
import de.brendamour.jpasskit.passes.PKGenericPass;
import de.brendamour.jpasskit.passes.PKGenericPassBuilder;
import de.brendamour.jpasskit.signing.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.cert.CertificateException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AppleWalletService {

    private final LibraryMembershipService membershipService;
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

    public PKPass getAppleWalletJson(Long membershipId) {
        LibraryMembership libraryMembership = membershipService.getLibraryMembershipById(membershipId);

        PKGenericPassBuilder genericPass = PKGenericPass.builder()
                .passType(PKPassType.PKStoreCard);

        PKBarcode barcode = PKBarcode.builder()
                .format(PKBarcodeFormat.PKBarcodeFormatCode128)
                .altText(libraryMembership.getNumber())
                .message(libraryMembership.getNumber())
                .messageEncoding(StandardCharsets.UTF_8)
                .build();

        // #1cb15a
        // #2ab564
        // #3ab56d
        String primaryColor = "#3ab56d";
        String textColor = "rgb(255, 255, 255)";

        return PKPass.builder()
                .pass(genericPass)
                .barcodes(List.of(barcode))
                .formatVersion(1)

                .passTypeIdentifier(passTypeIdentifier)
                .serialNumber("booksitout-library-membership-" + membershipId)
                .teamIdentifier(teamIdentifier)
                .organizationName(organizationName)

                .description("책잇아웃에서 관리되는 도서관 회원증이에요")
                .formatVersion(1)

                .logoText(libraryMembership.getRegion().getKoreanName() + " " + "도서관")
                .backgroundColor(primaryColor)
                .foregroundColor(textColor)

                .build();
    }

    public byte[] getAppleWalletPass(PKPass pkPass) throws IOException, CertificateException, PKSigningException {
        PKSigningInformation pkSigningInformation = new PKSigningInformationUtil()
                .loadSigningInformationFromPKCS12AndIntermediateCertificate(privateCertificatePath, passKeyPassword, appleCertificatePath);
        IPKPassTemplate pkPassTemplateFolder = new PKPassTemplateFolder(templatePath);

        return pkFileBasedSigningUtil.createSignedAndZippedPkPassArchive(pkPass, pkPassTemplateFolder, pkSigningInformation);
    }

}
