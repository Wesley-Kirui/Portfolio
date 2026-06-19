import {
  PROJECTS,
  MOCK_BLOG_POSTS,
  RESEARCH_PORTFOLIO,
  MOCK_ANALYTICS
} from './initialData';

import type {
  ProjectDetail,
  BlogPost,
  PublicationDetail,
  Message,
  AnalyticsData
} from './initialData';

// Check if Firebase configuration is available
export const isFirebaseConfigured = (): boolean => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return !!(apiKey && apiKey !== 'YOUR_FIREBASE_API_KEY' && apiKey.length > 10);
};

// Keys for LocalStorage
const KEYS = {
  PROJECTS: 'portfolio_projects',
  BLOG: 'portfolio_blog_posts',
  PUBLICATIONS: 'portfolio_publications',
  MESSAGES: 'portfolio_messages',
  ANALYTICS: 'portfolio_analytics',
  AUTH: 'portfolio_admin_auth'
};

// Initialize LocalStorage with Mock Data if empty
export const initializeDatabase = () => {
  if (!localStorage.getItem(KEYS.PROJECTS)) {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(PROJECTS));
  }
  if (!localStorage.getItem(KEYS.BLOG)) {
    localStorage.setItem(KEYS.BLOG, JSON.stringify(MOCK_BLOG_POSTS));
  }
  if (!localStorage.getItem(KEYS.PUBLICATIONS)) {
    localStorage.setItem(KEYS.PUBLICATIONS, JSON.stringify(RESEARCH_PORTFOLIO.publications));
  }
  if (!localStorage.getItem(KEYS.MESSAGES)) {
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.ANALYTICS)) {
    localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(MOCK_ANALYTICS));
  }
};

// Run initialization
initializeDatabase();

// ----------------------------------------------------
// DB ACCESS METHODS (Automatically routes Local vs Firebase)
// ----------------------------------------------------

// Projects
export const dbGetProjects = async (): Promise<ProjectDetail[]> => {
  if (isFirebaseConfigured()) {
    try {
      // Lazy import to prevent bundling overhead/errors if Firebase isn't configured
      const { collection, getDocs, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const list: ProjectDetail[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as ProjectDetail);
      });
      return list.length > 0 ? list : JSON.parse(localStorage.getItem(KEYS.PROJECTS) || '[]');
    } catch (e) {
      console.warn('Firebase error fetching projects, falling back to LocalStorage', e);
    }
  }
  return JSON.parse(localStorage.getItem(KEYS.PROJECTS) || '[]');
};

export const dbAddProject = async (project: Omit<ProjectDetail, 'id'>): Promise<ProjectDetail> => {
  const newId = 'proj_' + Date.now();
  const newProj: ProjectDetail = { id: newId, ...project };

  if (isFirebaseConfigured()) {
    try {
      const { collection, addDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'projects'), project);
      return { id: docRef.id, ...project };
    } catch (e) {
      console.error('Firebase error adding project, using LocalStorage', e);
    }
  }

  const list = await dbGetProjects();
  list.push(newProj);
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(list));
  return newProj;
};

export const dbUpdateProject = async (id: string, project: Omit<ProjectDetail, 'id'>): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, updateDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'projects', id);
      await updateDoc(docRef, project as any);
      return;
    } catch (e) {
      console.error('Firebase error updating project, using LocalStorage', e);
    }
  }

  const list = await dbGetProjects();
  const idx = list.findIndex(p => p.id === id);
  if (idx !== -1) {
    list[idx] = { id, ...project };
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(list));
  }
};

export const dbDeleteProject = async (id: string): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'projects', id);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.error('Firebase error deleting project, using LocalStorage', e);
    }
  }

  const list = await dbGetProjects();
  const updated = list.filter(p => p.id !== id);
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(updated));
};

// Blog Posts
export const dbGetBlogPosts = async (): Promise<BlogPost[]> => {
  if (isFirebaseConfigured()) {
    try {
      const { collection, getDocs, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'blog_posts'));
      const list: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      return list.length > 0 ? list : JSON.parse(localStorage.getItem(KEYS.BLOG) || '[]');
    } catch (e) {
      console.warn('Firebase error fetching blogs, falling back to LocalStorage', e);
    }
  }
  return JSON.parse(localStorage.getItem(KEYS.BLOG) || '[]');
};

export const dbAddBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  const newId = 'blog_' + Date.now();
  const newPost: BlogPost = { id: newId, ...post };

  if (isFirebaseConfigured()) {
    try {
      const { collection, addDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'blog_posts'), post);
      return { id: docRef.id, ...post };
    } catch (e) {
      console.error('Firebase error adding blog, using LocalStorage', e);
    }
  }

  const list = await dbGetBlogPosts();
  list.push(newPost);
  localStorage.setItem(KEYS.BLOG, JSON.stringify(list));
  return newPost;
};

export const dbUpdateBlogPost = async (id: string, post: Omit<BlogPost, 'id'>): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, updateDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'blog_posts', id);
      await updateDoc(docRef, post as any);
      return;
    } catch (e) {
      console.error('Firebase error updating blog, using LocalStorage', e);
    }
  }

  const list = await dbGetBlogPosts();
  const idx = list.findIndex(p => p.id === id);
  if (idx !== -1) {
    list[idx] = { id, ...post };
    localStorage.setItem(KEYS.BLOG, JSON.stringify(list));
  }
};

export const dbDeleteBlogPost = async (id: string): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'blog_posts', id);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.error('Firebase error deleting blog, using LocalStorage', e);
    }
  }

  const list = await dbGetBlogPosts();
  const updated = list.filter(p => p.id !== id);
  localStorage.setItem(KEYS.BLOG, JSON.stringify(updated));
};

// Publications
export const dbGetPublications = async (): Promise<PublicationDetail[]> => {
  if (isFirebaseConfigured()) {
    try {
      const { collection, getDocs, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'publications'));
      const list: PublicationDetail[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as PublicationDetail);
      });
      return list.length > 0 ? list : JSON.parse(localStorage.getItem(KEYS.PUBLICATIONS) || '[]');
    } catch (e) {
      console.warn('Firebase error fetching publications, falling back to LocalStorage', e);
    }
  }
  return JSON.parse(localStorage.getItem(KEYS.PUBLICATIONS) || '[]');
};

export const dbAddPublication = async (pub: Omit<PublicationDetail, 'id'>): Promise<PublicationDetail> => {
  const newId = 'pub_' + Date.now();
  const newPub: PublicationDetail = { id: newId, ...pub };

  if (isFirebaseConfigured()) {
    try {
      const { collection, addDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'publications'), pub);
      return { id: docRef.id, ...pub };
    } catch (e) {
      console.error('Firebase error adding publication, using LocalStorage', e);
    }
  }

  const list = await dbGetPublications();
  list.push(newPub);
  localStorage.setItem(KEYS.PUBLICATIONS, JSON.stringify(list));
  return newPub;
};

export const dbUpdatePublication = async (id: string, pub: Omit<PublicationDetail, 'id'>): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, updateDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'publications', id);
      await updateDoc(docRef, pub as any);
      return;
    } catch (e) {
      console.error('Firebase error updating publication, using LocalStorage', e);
    }
  }

  const list = await dbGetPublications();
  const idx = list.findIndex(p => p.id === id);
  if (idx !== -1) {
    list[idx] = { id, ...pub };
    localStorage.setItem(KEYS.PUBLICATIONS, JSON.stringify(list));
  }
};

export const dbDeletePublication = async (id: string): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'publications', id);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.error('Firebase error deleting publication, using LocalStorage', e);
    }
  }

  const list = await dbGetPublications();
  const updated = list.filter(p => p.id !== id);
  localStorage.setItem(KEYS.PUBLICATIONS, JSON.stringify(updated));
};

// Contact Messages
export const dbGetMessages = async (): Promise<Message[]> => {
  if (isFirebaseConfigured()) {
    try {
      const { collection, getDocs, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'messages'));
      const list: Message[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Message);
      });
      return list;
    } catch (e) {
      console.warn('Firebase error fetching messages, falling back to LocalStorage', e);
    }
  }
  return JSON.parse(localStorage.getItem(KEYS.MESSAGES) || '[]');
};

export const dbAddMessage = async (msg: Omit<Message, 'id' | 'date' | 'read'>): Promise<Message> => {
  const newMsg: Omit<Message, 'id'> = {
    ...msg,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    read: false
  };

  if (isFirebaseConfigured()) {
    try {
      const { collection, addDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'messages'), newMsg);
      return { id: docRef.id, ...newMsg };
    } catch (e) {
      console.error('Firebase error adding message, using LocalStorage', e);
    }
  }

  const list = await dbGetMessages();
  const savedMsg: Message = { id: 'msg_' + Date.now(), ...newMsg };
  list.push(savedMsg);
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(list));
  return savedMsg;
};

export const dbToggleMessageRead = async (id: string): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, getDoc, updateDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'messages', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        await updateDoc(docRef, { read: !snapshot.data().read });
      }
      return;
    } catch (e) {
      console.error('Firebase error updating message, using LocalStorage', e);
    }
  }

  const list = await dbGetMessages();
  const idx = list.findIndex(m => m.id === id);
  if (idx !== -1) {
    list[idx].read = !list[idx].read;
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(list));
  }
};

export const dbDeleteMessage = async (id: string): Promise<void> => {
  if (isFirebaseConfigured()) {
    try {
      const { doc, deleteDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const docRef = doc(db, 'messages', id);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.error('Firebase error deleting message, using LocalStorage', e);
    }
  }

  const list = await dbGetMessages();
  const updated = list.filter(m => m.id !== id);
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(updated));
};

// Analytics
export const dbGetAnalytics = async (): Promise<AnalyticsData> => {
  return JSON.parse(localStorage.getItem(KEYS.ANALYTICS) || JSON.stringify(MOCK_ANALYTICS));
};

export const dbTrackEvent = async (type: 'views' | 'downloads' | 'submissions'): Promise<void> => {
  const current: AnalyticsData = JSON.parse(
    localStorage.getItem(KEYS.ANALYTICS) || JSON.stringify(MOCK_ANALYTICS)
  );
  
  // Increment today (the last element in the array represents today)
  if (type === 'views') {
    current.views[current.views.length - 1]++;
  } else if (type === 'downloads') {
    current.downloads[current.downloads.length - 1]++;
  } else if (type === 'submissions') {
    current.submissions[current.submissions.length - 1]++;
  }

  localStorage.setItem(KEYS.ANALYTICS, JSON.stringify(current));
};

// Mock File Upload (Outputs object URL in Mock, uploads to Firebase Storage in Production)
export const dbUploadFile = async (file: File): Promise<string> => {
  if (isFirebaseConfigured()) {
    try {
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const storage = getStorage();
      const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (e) {
      console.error('Firebase storage upload failed, utilizing mock local URL', e);
    }
  }
  
  // Mock fallback: create a local object URL (valid during browser session)
  return URL.createObjectURL(file);
};
