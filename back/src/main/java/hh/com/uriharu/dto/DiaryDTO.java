package hh.com.uriharu.dto;

import java.time.LocalDateTime;

import hh.com.uriharu.model.DiaryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DiaryDTO {
    private Long dno;
    private String writer;
    private String title;
    private String contents;
    private LocalDateTime regdate;
    private LocalDateTime moddate;

    //userid는 시큐리티를 통해 인증

    public DiaryDTO(final DiaryEntity entity){
        this.dno = entity.getDno();
        this.writer = entity.getWriter();
        this.title = entity.getTitle();
        this.contents = entity.getContents();
    }

    public static DiaryEntity toEntity(final DiaryDTO dto) {
        return DiaryEntity.builder()
        .dno(dto.getDno())
        .writer((dto.getWriter()))
        .title(dto.getTitle())
        .contents((dto.getContents()))
        .regdate(dto.getRegdate())
        .moddate(dto.getModdate())
        .build();
    }
}
