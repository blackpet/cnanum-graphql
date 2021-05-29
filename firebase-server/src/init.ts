// environment variable setup
import './env';

// initialize firebase
import {db} from './firebase';

// initialize database (from jsonplaceholder)
import albums from '../../data/albums.json';
import comments from '../../data/comments.json';
import photos from '../../data/photos.json';
import posts from '../../data/posts.json';
import todos from '../../data/todos.json';
import users from '../../data/users.json';

albums.forEach(album =>
  db.collection('albums')
    .doc(album.id.toString())
    .set(album));


comments.forEach(comment =>
  db.collection('comments')
    .doc(comment.id.toString())
    .set(comment));


photos.forEach(photo =>
  db.collection('photos')
    .doc(photo.id.toString())
    .set(photo));


posts.forEach(post =>
  db.collection('posts')
    .doc(post.id.toString())
    .set(post));


todos.forEach(todo =>
  db.collection('todos')
    .doc(todo.id.toString())
    .set(todo));


users.forEach(user =>
  db.collection('users')
    .doc(user.id.toString())
    .set(user));

