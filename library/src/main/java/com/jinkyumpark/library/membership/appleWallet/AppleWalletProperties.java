package com.jinkyumpark.library.membership.appleWallet;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Getter @Setter

@Component
@ConfigurationProperties(prefix = "apple.wallet")
public class AppleWalletProperties {

    private String secret;

    @NestedConfigurationProperty
    private Identifier identifier;

    @Getter @Setter
    public static class Identifier {
        private String passTypeIdentifier;
        private String teamIdentifier;
        private String organizationName;
    }

    private Path path;

    @Getter @Setter
    public static class Path {
        private String templatePath;
        private String appleCertificatePath;
        private String privateCertificatePath;
    }

}
