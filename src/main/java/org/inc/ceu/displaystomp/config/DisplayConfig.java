package org.inc.ceu.displaystomp.config;

import java.util.Map;
import java.util.Optional;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "display-config")
@Data
public class DisplayConfig {

    private String defaultDisplay;
    private boolean useKeyWhenNotPresent;
    private Map<String, String> displayMap;

    public String getDisplayByKey(String key) {
        Optional<String> optionalDisplay = Optional.ofNullable(displayMap.get(key));

        if (optionalDisplay.isPresent()) {
            return optionalDisplay.get();
        }

        if (useKeyWhenNotPresent) {
            return key;
        } else {
            return getDefaultDisplay();
        }
    }
}
