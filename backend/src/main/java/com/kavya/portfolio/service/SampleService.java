package com.kavya.portfolio.service;

import com.kavya.portfolio.dto.SampleResponse;
import com.kavya.portfolio.entity.SystemMessage;
import com.kavya.portfolio.exception.ResourceNotFoundException;
import com.kavya.portfolio.repository.SystemMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SampleService {

  private static final String CONNECTION_MESSAGE_CODE = "frontend-backend";

  private final SystemMessageRepository systemMessageRepository;

  public SampleService(SystemMessageRepository systemMessageRepository) {
    this.systemMessageRepository = systemMessageRepository;
  }

  @Transactional(readOnly = true)
  public SampleResponse getConnectionMessage() {
    SystemMessage systemMessage = systemMessageRepository.findByCode(CONNECTION_MESSAGE_CODE)
        .orElseThrow(() -> new ResourceNotFoundException("Connection sample message was not found."));

    return new SampleResponse("connected", systemMessage.getMessage(), "v1");
  }
}
