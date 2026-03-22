import { useEffect, useState, useCallback } from 'react'
import { db, auth } from '~/lib/firebase'
import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore'
import { signInAnonymously } from 'firebase/auth'

interface Props {
  postId: string
}

function getDocId(postId: string): string {
  return postId.replace(/\//g, '-')
}

export default function FirebaseEngagement({ postId }: Props) {
  const [views, setViews] = useState<number | null>(null)
  const [likes, setLikes] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)

  const viewsDocId = `views_${getDocId(postId)}`
  const likesDocId = `likes_${getDocId(postId)}`

  useEffect(() => {
    const storedLike = localStorage.getItem(`liked_${postId}`)
    if (storedLike === 'true') {
      setLiked(true)
    }

    const unsubViews = onSnapshot(doc(db, 'views', viewsDocId), (snap) => {
      setViews(snap.exists() ? (snap.data().views as number) : 0)
    })

    const unsubLikes = onSnapshot(doc(db, 'likes', likesDocId), (snap) => {
      setLikes(snap.exists() ? (snap.data().likes as number) : 0)
    })

    const viewedKey = `viewed_${postId}`
    if (!localStorage.getItem(viewedKey)) {
      signInAnonymously(auth)
        .then(() => {
          const viewRef = doc(db, 'views', viewsDocId)
          return getDoc(viewRef).then((snap) => {
            if (snap.exists()) {
              return setDoc(viewRef, { views: increment(1) }, { merge: true })
            } else {
              return setDoc(viewRef, { views: 1 })
            }
          })
        })
        .then(() => {
          localStorage.setItem(viewedKey, 'true')
        })
        .catch(() => {})
    }

    return () => {
      unsubViews()
      unsubLikes()
    }
  }, [postId])

  const toggleLike = useCallback(async () => {
    try {
      await signInAnonymously(auth)
      const likeRef = doc(db, 'likes', likesDocId)
      const snap = await getDoc(likeRef)

      if (liked) {
        if (snap.exists()) {
          await setDoc(likeRef, { likes: increment(-1) }, { merge: true })
        }
        localStorage.removeItem(`liked_${postId}`)
        setLiked(false)
      } else {
        if (snap.exists()) {
          await setDoc(likeRef, { likes: increment(1) }, { merge: true })
        } else {
          await setDoc(likeRef, { likes: 1 })
        }
        localStorage.setItem(`liked_${postId}`, 'true')
        setLiked(true)
      }
    } catch {
      // silently fail
    }
  }, [liked, postId, likesDocId])

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {views !== null ? views.toLocaleString() : '...'}
      </span>
      <button
        onClick={toggleLike}
        className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer"
        aria-label={liked ? 'Unlike' : 'Like'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={liked ? 'text-red-500' : ''}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        {likes !== null ? likes.toLocaleString() : '...'}
      </button>
    </div>
  )
}
