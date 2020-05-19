package se.kth.sda.skeleton.ImageUpload;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
public class ImageController {

    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private ImageService imageService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private PostService postService;


    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {

        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());

        ImageModel imageFile = imageService.storeFile(file);
        imageFile.setUser(user);
        user.setImageModel(imageFile);
        imageService.saveImage(imageFile);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(imageFile.getId())
                .toUriString();

        return new UploadFileResponse(imageFile.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile")
    public ResponseEntity<Resource> downloadFile() {

        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
        ImageModel imageFile = imageService.getImageByUser(user);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(imageFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageFile.getFileName() + "\"")
                .body(new ByteArrayResource(imageFile.getData()));
    }

    @GetMapping(path = { "/getImage" })
    public ImageModel getImage() throws IOException {
        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
        return imageService.getImageByUser(user);
    }

    @GetMapping(path = { "/{id}/getImage" })
    public ImageModel getServiceProviderImage(@PathVariable Long postId) throws IOException {
        return imageService.getImageForPost(postId);
    }


}




