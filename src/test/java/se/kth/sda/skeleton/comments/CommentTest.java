package se.kth.sda.skeleton.comments;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.event.annotation.BeforeTestClass;
import org.springframework.test.context.event.annotation.BeforeTestExecution;
import org.springframework.test.context.event.annotation.BeforeTestMethod;
import org.springframework.web.client.RestTemplate;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostController;
import org.springframework.http.HttpHeaders;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.net.URI;
import java.net.URISyntaxException;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CommentTests {
    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    AuthService authService;

    @Autowired
    PostController postController;

    @Autowired
    UserService userService;

    @LocalServerPort
    int randomServerPort;

    static User userMock = new User("test@test.com", "password123", "My Name");
    static Post postMock = new Post("suiehfuef",userMock);
    static Comment commentMock = new Comment(1L, "aaa", postMock, userMock);
    private static boolean registered = false;
    private static boolean savedInDB = false;

    String getAuthHeader() {
        if (this.registered == false) {
            userService.register(userMock);
            this.registered = true;
        }
        return "Bearer " + authService.createAuthToken(userMock.getEmail());
    }

    public Post savePostIntoDB() throws URISyntaxException {
        if (this.savedInDB == true){
            return postMock;
        }
        postMock.setId(1L);
        postMock.setUser(userMock);
        URI uri = setupURI("/posts");

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, getAuthHeader());

        HttpEntity<Post> request = new HttpEntity<>(postMock, headers);

        ResponseEntity<String> result = this.testRestTemplate.postForEntity(uri, request, String.class);
        this.savedInDB = true;
        return postMock;
    }

    private URI setupURI(String url) throws URISyntaxException {
        String baseURL = "http://localhost:" + randomServerPort;
        return new URI(baseURL + url);
    }

    private HttpEntity<Comment> setupRequest(Comment comment) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, getAuthHeader());

        return new HttpEntity<>(comment, headers);
    }

    @Test
    public void postCommentTest() throws NoSuchBeanDefinitionException, URISyntaxException {
        Post savedPost = savePostIntoDB();
        URI uri = setupURI("/posts/" + savedPost.getId() + "/comments/" + savedPost.getUser().getEmail()); //postComment
        HttpEntity<Comment> request = setupRequest(commentMock);

        ResponseEntity<String> result = this.testRestTemplate.postForEntity(uri, request, String.class);
        Assertions.assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    public void updateCommentTest() throws NoSuchBeanDefinitionException, URISyntaxException {
        Post savedPost = savePostIntoDB();
        URI uri = setupURI("/posts/" + savedPost.getId() + "/comments/" + savedPost.getUser().getId());
        Comment updatedComment = new Comment(2L,"vhdiusahvudis",savedPost, savedPost.getUser());
        HttpEntity<Comment> request = setupRequest(updatedComment);

        ResponseEntity<String> result = this.testRestTemplate.postForEntity(uri, request, String.class);
        Assertions.assertEquals(200, result.getStatusCodeValue());
    }
}