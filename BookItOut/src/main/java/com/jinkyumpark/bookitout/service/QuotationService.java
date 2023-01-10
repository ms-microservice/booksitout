package com.jinkyumpark.bookitout.service;

import com.jinkyumpark.bookitout.request.QuotationEditRequest;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.model.Quotation;
import com.jinkyumpark.bookitout.repository.QuotationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class QuotationService {
    private QuotationRepository quotationRepository;

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
        Quotation existingQuotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new NotFoundException(""));

            existingQuotation.setContent(quotationEditRequest.getContent());
            existingQuotation.setPage(quotationEditRequest.getPage());
            existingQuotation.setFrom_who(quotationEditRequest.getFromWho());
    }

    public void deleteQuotation(Long quotationId) {
        quotationRepository.deleteById(quotationId);
    }
}
