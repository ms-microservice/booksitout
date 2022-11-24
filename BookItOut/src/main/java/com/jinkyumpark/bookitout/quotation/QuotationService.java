package com.jinkyumpark.bookitout.quotation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class QuotationService {
    private QuotationRepository quotationRepository;
}
