package org.inc.ceu.displaystomp.controller;

import lombok.RequiredArgsConstructor;
import org.inc.ceu.displaystomp.model.DisplayModel;
import org.inc.ceu.displaystomp.service.DisplayService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class DisplayController {

    private final DisplayService displayService;

    @MessageMapping("/display")
    @PutMapping("/display")
    @SendTo("/topic/display")
    public DisplayModel updateDisplayModel(@RequestBody RequestMessage requestMessage) {
        return displayService.updateTextToDisplay(HtmlUtils.htmlEscape(requestMessage.getNewText()));
    }

    @GetMapping("/display")
    public DisplayModel getDisplayModel() {
        return displayService.getDisplayModel();
    }

}
