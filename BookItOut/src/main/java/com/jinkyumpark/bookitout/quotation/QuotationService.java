package com.jinkyumpark.bookitout.quotation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class QuotationService {
    private QuotationRepository quotationRepository;

    public List<Quotation> getAllQuotationByBookId(Long bookId) {
        return quotationRepository.findAllByBook_BookId(bookId);
    }
}
