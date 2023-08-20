package org.inc.ceu.displaystomp.service;

import java.time.LocalDateTime;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.inc.ceu.displaystomp.config.DisplayConfig;
import org.inc.ceu.displaystomp.model.DisplayModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DisplayService {

    private final DisplayConfig displayConfig;

    private DisplayModel displayModel;

    public DisplayModel updateTextToDisplay(String newText) {
        this.displayModel.setTextToDisplay(displayConfig.getDisplayByKey(newText));
        this.displayModel.setLastUpdate(LocalDateTime.now());
        return this.displayModel;
    }

    public DisplayModel getDisplayModel() {
        return this.displayModel;
    }

    @PostConstruct
    public void initialize() {
        this.displayModel = DisplayModel.builder()
                .textToDisplay(displayConfig.getDefaultDisplay())
                .lastUpdate(LocalDateTime.now())
                .build();
    }

}
