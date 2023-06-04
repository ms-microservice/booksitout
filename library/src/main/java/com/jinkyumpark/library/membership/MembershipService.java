package com.jinkyumpark.library.membership;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MembershipService {

    private final LibraryMembershipRepository libraryMembershipRepository;

    public Membership getLibraryMembershipById(Long membershipId) {
        return libraryMembershipRepository.findById(membershipId)
                .orElseThrow(() -> new NotFoundException("membership not present"));
    }

    public Page<Membership> getAllMembership(Long appUserId, Pageable pageable) {
        return libraryMembershipRepository.findAllByAppUserId(appUserId, pageable);
    }

    public Membership add(Membership membership) {
        return libraryMembershipRepository.save(membership);
    }

    @Transactional
    public Membership update(Membership libraryMembership) {
        Membership membership = libraryMembershipRepository.findById(libraryMembership.getLibraryMembershipId())
                .orElseThrow(() -> new NotFoundException("수정할 회원증이 없어요"));

        if (!membership.getAppUserId().equals(libraryMembership.getAppUserId())) {
            throw new UnauthorizedException("회원증은 본인만 수정할 수 있어요");
        }

        return membership.update(libraryMembership);
    }

    public void delete(Long appUserId, Long membershipId) {
        Membership membership = libraryMembershipRepository.findById(membershipId)
                .orElseThrow(() -> new NotFoundException("지우시려는 회원증이 없어요"));

        if (!membership.getAppUserId().equals(appUserId)) {
            throw new UnauthorizedException("회원증은 본인만 지울 수 있어요");
        }

        libraryMembershipRepository.deleteById(membershipId);
    }

}
