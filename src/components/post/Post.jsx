import { useState } from 'react'
import { Avatar } from '../avatar/Avatar'
import { Comment } from '../comment/Comment'
import styles from './Post.module.css'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'



export function Post({ author, publishedAt, content }) {

    const [comments, setComments] = useState(['Post'])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", { locale: ptBR });

    const plublishDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    function handleNewComment() {
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    };

    function handleNewCommentChange() {
        setNewCommentText(event.target.value)
    };



    function deleteComment(commentToDelete) {
        const commentsWhitoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWhitoutDeleteOne);
    };

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>

                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {plublishDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>

                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}


            </div>

            <form onSubmit={handleNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment"
                    value={newCommentText}
                    placeholder='Deixe um comentario'
                    onChange={handleNewCommentChange}
                    required

                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty} >Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (<Comment
                        key={comment}
                        content={comment}
                        deleteComment={deleteComment}
                    />
                    )
                })}

            </div>

        </article>
    )
}