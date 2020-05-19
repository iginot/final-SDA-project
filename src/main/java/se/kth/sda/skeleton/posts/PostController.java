package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.util.List;
import java.util.Optional;
/*
    @TODO AutoWire PostService and create the methods needed to implement the API.
    Don't forget to add necessary annotations.
 */

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @GetMapping("")
    public List<Post> getAll() {
        return postService.getAll();
    }

    @GetMapping("/email")
    public String getEmail(){
        return authService.getLoggedInUserEmail();
    }

    @GetMapping("/future")
    public List<Post> getAllActiveAndFull(){
        return postService.getActiveAndFullPosts();
    }

    @GetMapping("/{id}")
    public Post getById(@PathVariable Long id) {
        return postService.getByID(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("")
    public Post savePost(@RequestBody Post newPost ) {
            User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
            newPost.setUser(user);
            return postService.save(newPost);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        postService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Post update(@PathVariable Long id,@RequestBody Post updatePost) throws Exception {
        return postService.update(id,updatePost);
    }

    @PutMapping("/{id}/book")
    public Post updatePostWithAttendeeInfo(@PathVariable Long id) throws Exception {
        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
        Optional<Post> post = postService.getByID(id);
        if (post.isPresent()){
            postService.updateUserWithBookedService(user, post.get());
            return postService.updatePostWithAttendeeInfo(post.get(), user);
        }
         throw new Exception("PostId " + id + " not found");
    }

    @GetMapping("/myEvents")
    public List<Post> listOfPostsByServiceProviderEmail(){
        String email = authService.getLoggedInUserEmail();
        return postService.getPostsByServiceProviderEmail(email);
    }

    @GetMapping("/myBookings")
    public List<Post> listOfBookedServices(){
        User user = userService.findUserByEmail(authService.getLoggedInUserEmail());
        return user.getBookedServices();
    }
}
