package hh.com.uriharu.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hh.com.uriharu.dto.DiaryDTO;
import hh.com.uriharu.dto.ResponseDTO;
import hh.com.uriharu.model.DiaryEntity;
import hh.com.uriharu.service.DiaryService;
import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j
@RequestMapping("diary")
public class DiaryController {
    @Autowired
    private DiaryService service;

    

    @PostMapping("create")
    public ResponseEntity<?> createHaru(@AuthenticationPrincipal String userId,@RequestBody DiaryDTO dto){
        try {
            DiaryEntity entity = DiaryDTO.toEntity(dto);
            entity.setDno(null);
            entity.setWriter(userId);
            
            List<DiaryEntity> entities = service.create(entity);
            List<DiaryDTO> dtos = entities.stream().map(DiaryDTO :: new).collect(Collectors.toList());
            ResponseDTO<DiaryDTO> response = ResponseDTO.<DiaryDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<DiaryDTO> response = ResponseDTO.<DiaryDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("myread")
    public ResponseEntity<?> retieveMyHaru(@AuthenticationPrincipal String userId){

        List<DiaryEntity> entites = service.retrieve(userId);
        List<DiaryDTO> dtos = entites.stream().map(DiaryDTO::new).collect(Collectors.toList());
        ResponseDTO<DiaryDTO> response = ResponseDTO.<DiaryDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("read/{dno}")
    public ResponseEntity<?> retieveHaruByDno(@AuthenticationPrincipal String userId, @PathVariable Long dno){

        DiaryEntity entity = service.retrieveByDno(dno);
        
        DiaryDTO dto = DiaryDTO.builder()
        .dno(entity.getDno())
        .writer(entity.getWriter())
        .title(entity.getTitle())
        .contents(entity.getContents())
        .moddate(entity.getModdate())
        .build();
        
        return ResponseEntity.ok().body(dto);
    }

    @PutMapping("modify")
    public ResponseEntity<?> updateHaru(@AuthenticationPrincipal String userId, @RequestBody DiaryDTO dto) {

        DiaryEntity entity = DiaryDTO.toEntity(dto);
        entity.setWriter(userId);
        log.warn("userId:"+userId);

        DiaryEntity entities = service.update(entity);
        log.warn("entity to dto...");

        DiaryDTO dtos = DiaryDTO.builder()
        .dno(entities.getDno())
        .title(entities.getTitle())
        .contents(entities.getContents())
        .moddate(entities.getModdate())
        .build();

        return ResponseEntity.ok().body(dtos);
        
    }

  
}
