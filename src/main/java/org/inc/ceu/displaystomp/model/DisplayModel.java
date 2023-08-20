package org.inc.ceu.displaystomp.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DisplayModel {
    private LocalDateTime lastUpdate;
    private String textToDisplay;
}
