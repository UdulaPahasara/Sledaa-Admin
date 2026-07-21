package com.Sleeda.Sleeda.repository;

import com.Sleeda.Sleeda.entity.AlbumImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumImageRepository extends JpaRepository<AlbumImage, Long> {
}
