package com.jinkyumpark.bookitout.app.quotation;

import com.jinkyumpark.bookitout.app.quotation.request.QuotationEditRequest;
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
        Quotation quotation = this.getQuotationByQuotationId(quotationId);

        if (quotationEditRequest.getContent() != null) {
            quotation.setContent(quotation.getContent());
        }
        if (quotationEditRequest.getPage() != null) {
            quotation.setPage(quotationEditRequest.getPage());
        }
        if (quotationEditRequest.getFromWho() != null) {
            quotation.setFrom_who(quotationEditRequest.getFromWho());
        }
    }

    public void deleteQuotation(Long quotationId) {
        quotationRepository.deleteById(quotationId);
    }
}
