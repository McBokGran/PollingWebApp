package com.example.pollseb.service;

import com.example.pollseb.exception.BadRequestException;
import com.example.pollseb.exception.ResourceNotFoundException;
import com.example.pollseb.model.*;
import com.example.pollseb.payload.*;
import com.example.pollseb.repository.PollRepository;
import com.example.pollseb.repository.UserRepository;
import com.example.pollseb.repository.VoteRepository;
import com.example.pollseb.security.UserPrincipal;
import com.example.pollseb.util.AppConstants;
import com.example.pollseb.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class UserService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private UserRepository userRepository;


    public UserProfile getUserProfile(String username){

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        long pollCount = pollRepository.countByCreatedBy(user.getId());
        long voteCount = voteRepository.countByUserId(user.getId());
        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), pollCount, voteCount);

        return userProfile;

    }

    public UserIdentityAvailability checkUsernameAvailability(String username){
        Boolean isAvailable = !userRepository.existsByUsername(username);
        UserIdentityAvailability userExists = new UserIdentityAvailability(isAvailable);
        return userExists;

    }

    public UserIdentityAvailability checkEmailAvailability(String email){
        Boolean isAvailable = !userRepository.existsByEmail(email);
        UserIdentityAvailability userExists = new UserIdentityAvailability(isAvailable);
        return userExists;

    }

    public UserSummary getCurrentUsers (UserPrincipal currentUser){
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;

    }
}
