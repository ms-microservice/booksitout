package com.jinkyumpark.library.library;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;

    public Page<Library> getLibraryByName(String name, Pageable pageable) {
        Page<Library> page = libraryRepository.findAllByName(name, pageable);

        return page;
    }

}
