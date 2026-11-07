import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Building, 
  ArrowRight, 
  ShieldCheck, 
  Clock,
  Tag
} from 'lucide-react';
import { newsService } from '../../services/news/newsService';
import { NewsCategory } from '../../types';

export const NewsListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (NewsCategory | 'All')[] = [
    'All',
    'Government Scholarships',
    'International Scholarships',
    'Education Announcements',
    'Education Policy Updates',
    'Scholarship Deadlines'
  ];

  const filteredNews = useMemo(() => {
    let list = newsService.getByCategory(selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(n => 
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="news-page-root">
      {/* Header */}
      <section className="news-header-banner">
        <div className="container">
          <div className="header-meta-row">
            <span className="section-eyebrow">Public Notifications</span>
            <span className="provenance-tag">
              <ShieldCheck size={16} className="text-success" />
              Verified Publishers & Official Gazettes
            </span>
          </div>
          <h1 className="news-title">Education & Scholarship News</h1>
          <p className="news-subtitle">
            Stay informed with verified notifications, portal verification timelines, policy updates, and fellowship announcements.
          </p>

          {/* Search */}
          <div className="news-search-wrap">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search education announcements, AICTE, NSP, deadlines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-main-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          {/* Category Tabs */}
          <div className="news-category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredNews.length === 0 ? (
            <div className="card empty-results-box">
              <Newspaper size={48} className="text-muted empty-icon" />
              <h3>No Articles Found</h3>
              <p>No news items match your current filter or search query.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} 
                className="btn btn-primary btn-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="news-cards-grid">
              {filteredNews.map((article) => (
                <div key={article.id} className="card news-card-item card-hover">
                  {article.imageUrl && (
                    <div className="news-img-box">
                      <img src={article.imageUrl} alt={article.title} loading="lazy" />
                      <span className="badge badge-primary news-category-badge">{article.category}</span>
                    </div>
                  )}

                  <div className="news-card-body">
                    <div className="news-meta-row">
                      <span className="news-publisher-tag">
                        <Building size={14} /> {article.publisher}
                      </span>
                      <span className="news-time-tag">
                        <Clock size={14} /> {article.readTime}
                      </span>
                    </div>

                    <Link to={`/news/${article.id}`} className="news-headline-link">
                      <h3 className="news-headline">{article.title}</h3>
                    </Link>

                    <p className="news-snippet">{article.summary}</p>

                    <div className="news-tags-row">
                      {article.tags.map((tag, i) => (
                        <span key={i} className="tag-chip">#{tag}</span>
                      ))}
                    </div>

                    <div className="news-card-footer">
                      <span className="news-published-date">{article.publicationDate}</span>
                      <Link to={`/news/${article.id}`} className="read-article-btn">
                        <span>Read Full Story</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

