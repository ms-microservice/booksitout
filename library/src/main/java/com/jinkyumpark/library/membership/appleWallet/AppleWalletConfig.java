package com.jinkyumpark.library.membership.appleWallet;

import de.brendamour.jpasskit.signing.PKFileBasedSigningUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppleWalletConfig {

    @Bean
    public PKFileBasedSigningUtil pkFileBasedSigningUtil() {
        return new PKFileBasedSigningUtil();
    }

}
