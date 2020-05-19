package se.kth.sda.skeleton.posts;

import org.hibernate.mapping.Array;
import org.hibernate.mapping.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import se.kth.sda.skeleton.auth.AuthController;
import se.kth.sda.skeleton.auth.AuthRequest;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostTests {
    @Autowired
    PostController postController;

    @Autowired
    UserService userService;

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    AuthService authService;

    @MockBean
    PostService postService;

    @LocalServerPort
    int randomServerPort;

    static User userMock = new User("test@test.com", "password123", "My Name");
    static Post postMock = new Post("suiehfuef", userMock);
    static Comment commentMock = new Comment(1L, "aaa", postMock, userMock);
    private static boolean registered = false;
    private static boolean savedInDB = false;

    @Test
    public void getById() {
        // Arrange
        Post post = new Post();
        post.setId(1L);
        post.setName("Test name");
        post.setDate("2020");
        Mockito.when(postService.getByID(Mockito.eq(1L)))
                .thenReturn(Optional.of(post));
        // Act
        Post got = postController.getById(1L);
        // Assert
        Assertions.assertEquals(post.getName(), got.getName());
    }

    @Test
    public void getAllTest() {
        // Arrange
        Post post1 = new Post();
        Post post2 = new Post();
        Post post3 = new Post();
        List<Post> postList = new ArrayList<Post>();
        postList.add(post1);
        postList.add(post2);
        postList.add(post3);
        Mockito.when(postService.getAll())
                .thenReturn(postList);
        // Act
        List<Post> mockedList = postService.getAll();
        // Assert
        Assertions.assertEquals(postList, mockedList);
    }

    String getAuthHeader() {
        if (this.registered == false) {
            userService.register(userMock);
            this.registered = true;
        }
        return "Bearer " + authService.createAuthToken(userMock.getEmail());
    }

    public Post savePostIntoDB() throws URISyntaxException {
        if (this.savedInDB == true) {
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

    private HttpEntity<Post> setupRequest(Post post) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, getAuthHeader());

        return new HttpEntity<>(post, headers);
    }

    private HttpEntity<List<Post>> setupListRequest(List<Post> postList) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, getAuthHeader());

        return new HttpEntity<>(postList, headers);
    }

    @Test
    public void savePostTest() {
        // Arrange
        Post post = new Post();
        Mockito.when(postService.save(post))
                .thenReturn(post);
        // Act
        Post mockedPost = postService.save(post);
        // Assert
        Assertions.assertEquals(post, mockedPost);
    }


    @Test
    public void updatePostWithAttendeeInfo() throws NoSuchBeanDefinitionException, URISyntaxException {
        Post savedPost = savePostIntoDB();
        URI uri = setupURI("/" + savedPost.getId() + "/book");
        HttpEntity<Post> request = setupRequest(savedPost);

        ResponseEntity<String> result = this.testRestTemplate.postForEntity(uri, request, String.class);
        Assertions.assertEquals(404, result.getStatusCodeValue());
    }

    @Test
    public void listPostByServiceProviderEmail() throws NoSuchBeanDefinitionException, URISyntaxException {
        Post savedPost = savePostIntoDB();
        URI uri = setupURI("/myEvents");
        HttpEntity<List<Post>> request = setupListRequest(new ArrayList<Post>());

        ResponseEntity<String> result = this.testRestTemplate.getForEntity(uri,String.class);
        Assertions.assertEquals(HttpStatus.FORBIDDEN, result.getStatusCode());
    }
}
