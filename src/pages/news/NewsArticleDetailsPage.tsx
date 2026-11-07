import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Share2, 
  Tag,
  AlertCircle
} from 'lucide-react';
import { newsService } from '../../services/news/newsService';

export const NewsArticleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = id ? newsService.getById(id) : undefined;
  const relatedNews = newsService.getAll().filter(n => n.id !== id).slice(0, 2);

  if (!article) {
    return (
      <div className="container section-padding">
        <div className="card empty-results-box">
          <AlertCircle size={48} className="text-warning" />
          <h2>News Article Not Found</h2>
          <p>The requested notification could not be found in our press repository.</p>
          <Link to="/news" className="btn btn-primary">Return to News Feed</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page-root">
      {/* Header Banner */}
      <section className="article-header-banner">
        <div className="container container-narrow">
          <button onClick={() => navigate(-1)} className="back-nav-btn">
            <ArrowLeft size={16} /> Back to News
          </button>

          <div className="article-badges-row">
            <span className="badge badge-primary">{article.category}</span>
            <span className="badge badge-success">
              <ShieldCheck size={12} /> Verified Press Notification
            </span>
          </div>

          <h1 className="article-title">{article.title}</h1>

          <div className="article-meta-bar">
            <div className="meta-item">
              <Building size={16} />
              <span><strong>Publisher:</strong> {article.publisher}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              <span>{article.publicationDate}</span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <section className="section-padding">
        <div className="container container-narrow">
          <article className="card article-main-card">
            {article.imageUrl && (
              <div className="article-featured-image-box">
                <img src={article.imageUrl} alt={article.title} />
              </div>
            )}

            <div className="article-lead-paragraph">
              <p>{article.summary}</p>
            </div>

            <div className="article-body-content">
              {article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Official Source Provenance Card */}
            <div className="article-source-box card">
              <div className="source-box-left">
                <ShieldCheck size={22} className="text-success" />
                <div>
                  <h4>Primary Source Citation</h4>
                  <p>
                    Published by <strong>{article.publisher}</strong>. Access the official dispatch directly:
                  </p>
                </div>
              </div>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                Official Link <ExternalLink size={14} />
              </a>
            </div>

            {/* Tags */}
            <div className="article-tags-container">
              <span className="tags-label"><Tag size={16} /> Related Topics:</span>
              <div className="tags-pills">
                {article.tags.map((tag, i) => (
                  <span key={i} className="badge badge-neutral">#{tag}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedNews.length > 0 && (
            <div className="related-articles-section">
              <h3>Related Announcements</h3>
              <div className="related-grid">
                {relatedNews.map(rel => (
                  <div key={rel.id} className="card related-card card-hover">
                    <span className="badge badge-primary">{rel.category}</span>
                    <Link to={`/news/${rel.id}`} className="related-title">
                      {rel.title}
                    </Link>
                    <span className="related-date">{rel.publicationDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

