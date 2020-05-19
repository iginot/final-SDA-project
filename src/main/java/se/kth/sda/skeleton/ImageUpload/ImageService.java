package se.kth.sda.skeleton.ImageUpload;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostService;
import se.kth.sda.skeleton.user.User;

import java.io.IOException;

@Service
public class ImageService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    PostService postService;

    public ImageModel storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            ImageModel imageFile = new ImageModel(fileName, file.getContentType(), file.getBytes());

            return imageRepository.save(imageFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public ImageModel getFile(String fileId) {
        return imageRepository.findById(fileId)
                .orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
    }

    public ImageModel saveImage(ImageModel imageModel){
        return imageRepository.save(imageModel);
    }

    public ImageModel getImageByUser(User user) {
        return getFile(user.getImageModel().getId());
    }

    public ImageModel getImageForPost(long postId) {
        Post post = postService.getByID(postId).get();
        return getFile(post.getUser().getImageModel().getId());
    }
}


