package com.example.pollseb.service;

import com.example.pollseb.repository.PollRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;

class PollServiceTest {

    private PollRepository pollRepository = Mockito.mock(PollRepository.class) ;

    @Test
    @DisplayName("Testing retrieving all polls per user")
    void getAllPolls() {


    }

    @DisplayName("Testing to retrieving polls created by the User")
    @Test
    void getPollsCreatedBy() {
    }


    @Test
    @DisplayName("Testing creating a poll")
    void createPoll() {

    }

    @Test
    @DisplayName("Testing retrieving the poll by its ID")
    void getPollById() {
    }

    @Test
    @DisplayName("Testing voting on the poll")
    void castVoteAndGetUpdatedPoll() {
    }
}