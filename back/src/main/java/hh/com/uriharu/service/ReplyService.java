package hh.com.uriharu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hh.com.uriharu.model.ReplyEntity;
import hh.com.uriharu.persistence.ReplyRepository;
import hh.com.uriharu.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ReplyService {
    
    @Autowired
    private ReplyRepository repository;

    @Autowired 
    private UserRepository userRepository;

    public List<ReplyEntity> create(final ReplyEntity entity) {
        //Validations
        validate(entity);
        repository.save(entity);
        log.info("Entity Id : {} is saved",entity.getRno());
        return repository.findReplyListByDno(entity.getRno());
    }


     //리팩토링한 메서드
     private void validate(final ReplyEntity entity){
           
        if (entity == null) {
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null");
        }

        if (entity.getWriter()==null) {
            log.warn("unknown user");
            throw new RuntimeException("unknown user");
        }
    }

    public String nicknameById(String id) {
        return userRepository.findNicknameById(id);
    }
}
