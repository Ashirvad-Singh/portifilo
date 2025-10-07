import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ExternalLink, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  link: string;
  author: number;
  featured_media: number;
  _embedded?: {
    author: Array<{ name: string }>;
    'wp:featuredmedia': Array<{ source_url: string; alt_text: string }>;
  };
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`https://www.autocruitment.com/wp-json/wp/v2/posts/${id}?_embed`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = stripHtml(content).split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="glass rounded-2xl p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading blog post...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background dark">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-destructive mb-4">❌ {error || 'Post not found'}</p>
                <Link to="/blog" className="btn-primary">
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {post._embedded?.['wp:featuredmedia']?.[0] && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 glass">
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post._embedded['wp:featuredmedia'][0].alt_text || stripHtml(post.title.rendered)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                {stripHtml(post.title.rendered)}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                {post._embedded?.author?.[0] && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post._embedded.author[0].name}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{estimateReadingTime(post.content.rendered)} min read</span>
                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Original</span>
                </a>
              </div>
            </header>

            {/* Article Content */}
            <div className="glass rounded-2xl p-8 md:p-12">
              <div 
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                style={{
                  color: 'hsl(var(--foreground))',
                }}
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Last updated: {formatDate(post.modified)}
                </div>
                
                <div className="flex items-center space-x-4">
                  <Link
                    to="/blog"
                    className="btn-outline"
                  >
                    More Articles
                  </Link>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    View Original
                  </a>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;