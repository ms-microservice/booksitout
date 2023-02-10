package com.jinkyumpark.bookitout.quotation;

import com.jinkyumpark.bookitout.common.exception.http.NotFoundException;
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

    public Long addQuotation(QuotationDto quotation) {
        return quotationRepository.save(quotation.toEntity()).getQuotationId();
    }

    @Transactional
    public void editQuotation(Long quotationId, QuotationDto quotationDto) {
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("quotation.edit.fail.not-found")));

        quotation.editQuotation(quotationDto);
    }

    public void deleteQuotation(Long quotationId) {
        quotationRepository.deleteById(quotationId);
    }
}
