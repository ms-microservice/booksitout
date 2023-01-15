package com.jinkyumpark.bookitout.service;

import com.jinkyumpark.bookitout.request.quotation.QuotationEditRequest;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.model.Quotation;
import com.jinkyumpark.bookitout.repository.QuotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuotationService {
    private final MessageSourceAccessor messageSource;
    private final QuotationRepository quotationRepository;

    public Quotation getQuotationByQuotationId(Long quotationId) {
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow();

        return quotation;
    }

    public List<Quotation> getAllQuotationByBookId(Long bookId) {
        return quotationRepository.findAllByBook_BookId(bookId);
    }

    public void addQuotation(Quotation quotation) {
        quotationRepository.save(quotation);
    }

    @Transactional
    public void editQuotation(Long quotationId, QuotationEditRequest quotationEditRequest) {
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("quotation.edit.fail.not-found")));

        quotation.editQuotation(quotationEditRequest);
    }

    public void deleteQuotation(Long quotationId) {
        quotationRepository.deleteById(quotationId);
    }
}
