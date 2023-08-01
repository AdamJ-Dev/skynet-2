package org.skynet.backend.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND, reason = "This programme does not exist.")
public class ProgrammeNotFoundException extends EntityNotFoundException {
}

