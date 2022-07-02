package com.example.pollseb.service;

import com.example.pollseb.model.ChoiceVoteCount;
import com.example.pollseb.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class VoteService {
    @Autowired
    private VoteRepository voteRepository;

    private Map<Long, Long> getChoiceVoteCountMap(List<Long> pollIds) {
        // Retrieve Vote Counts of every Choice belonging to the given pollIds
        List<ChoiceVoteCount> votes = voteRepository.countByPollIdInGroupByChoiceId(pollIds);

        Map<Long, Long> choiceVotesMap = votes.stream()
                .collect(Collectors.toMap(ChoiceVoteCount::getChoiceId, ChoiceVoteCount::getVoteCount));

        return choiceVotesMap;
    }
}
