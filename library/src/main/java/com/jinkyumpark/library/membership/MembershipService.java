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

    private final MembershipRepository membershipRepository;

    @Transactional
    public Membership getLibraryMembershipById(Long membershipId) {
        Membership membership = membershipRepository.findById(membershipId)
                .orElseThrow(() -> new NotFoundException("membership not present"));

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
                .orElseThrow(() -> new NotFoundException("수정할 회원증이 없어요"));

        if (!membership.getAppUserId().equals(libraryMembership.getAppUserId())) {
            throw new UnauthorizedException("회원증은 본인만 수정할 수 있어요");
        }

        return membership.update(libraryMembership);
    }

    public void delete(Long appUserId, Long membershipId) {
        Membership membership = membershipRepository.findById(membershipId)
                .orElseThrow(() -> new NotFoundException("지우시려는 회원증이 없어요"));

        if (!membership.getAppUserId().equals(appUserId)) {
            throw new UnauthorizedException("회원증은 본인만 지울 수 있어요");
        }

        membershipRepository.deleteById(membershipId);
    }

}
