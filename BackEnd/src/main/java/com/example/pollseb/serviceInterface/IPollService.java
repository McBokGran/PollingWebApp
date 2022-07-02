package com.example.pollseb.serviceInterface;

import com.example.pollseb.model.Poll;
import com.example.pollseb.payload.PagedResponse;
import com.example.pollseb.payload.PollRequest;
import com.example.pollseb.payload.PollResponse;
import com.example.pollseb.payload.VoteRequest;
import com.example.pollseb.security.UserPrincipal;

public interface IPollService {

    PagedResponse<PollResponse> getAllPolls(UserPrincipal currentUser, int page, int size);
    PagedResponse<PollResponse> getPollsCreatedBy(String username, UserPrincipal currentUser, int page, int size);
    PagedResponse<PollResponse> getPollsVotedBy(String username, UserPrincipal currentUser, int page, int size);
    Poll createPoll(PollRequest pollRequest);
    PollResponse getPollById(Long pollId, UserPrincipal currentUser);
    void deletePoll(Long pollId);
    PollResponse castVoteAndGetUpdatedPoll(Long pollId, VoteRequest voteRequest, UserPrincipal currentUser);


}
