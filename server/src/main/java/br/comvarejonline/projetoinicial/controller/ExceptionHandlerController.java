package br.comvarejonline.projetoinicial.controller;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.comvarejonline.projetoinicial.data.ExceptionDto;

@RestController
@ControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionDto> handlerStorage(RuntimeException ex, WebRequest req) {
        ExceptionDto response = new ExceptionDto(
            LocalDateTime.now(),
            ex.getMessage(),
            req.getDescription(true)
        );

        return new ResponseEntity<ExceptionDto>(response, HttpStatus.BAD_REQUEST);
    }
}
