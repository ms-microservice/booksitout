package com.jinkyumpark.library.membership;

import com.jinkyumpark.library.common.MessageKey;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final MessageSourceAccessor messageSource;

    @Transactional
    public Membership getLibraryMembershipById(Long membershipId) {
        Membership membership = membershipRepository.findById(membershipId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        messageSource.getMessage(MessageKey.MEMBERSHIP_GET_NOT_FOUND.getKey()))
                );

        membership.useMembership();

        return membership;
    }

    public Page<Membership> getAllMembership(Long appUserId, Pageable pageable) {
        return membershipRepository.findAllByAppUserId(appUserId, pageable);
    }

    public Membership add(Membership membership) {
        return membershipRepository.save(membership);
    }

    @Transactional
    public Membership update(Membership libraryMembership) {
        Membership membership = membershipRepository.findById(libraryMembership.getLibraryMembershipId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        messageSource.getMessage(MessageKey.MEMBERSHIP_PUT_NOT_FOUND.getKey()))
                );

        if (!membership.getAppUserId().equals(libraryMembership.getAppUserId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    messageSource.getMessage(MessageKey.MEMBERSHIP_PUT_UNAUTHORIZED.getKey())
            );
        }

        return membership.update(libraryMembership);
    }

    public void delete(Long appUserId, Long membershipId) {
        Membership membership = membershipRepository.findById(membershipId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        messageSource.getMessage(MessageKey.MEMBERSHIP_DELETE_NOT_FOUND.getKey()))
                );

        if (!membership.getAppUserId().equals(appUserId)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    messageSource.getMessage(MessageKey.MEMBERSHIP_DELETE_UNAUTHORIZED.getKey())
            );
        }

        membershipRepository.deleteById(membershipId);
    }

}
