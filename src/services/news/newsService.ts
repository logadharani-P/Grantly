import { EDUCATION_NEWS } from '../../data/news';
import { NewsArticle, NewsCategory } from '../../types';

class NewsService {
  private news: NewsArticle[] = EDUCATION_NEWS;

  getAll(): NewsArticle[] {
    return this.news;
  }

  getById(id: string): NewsArticle | undefined {
    return this.news.find(n => n.id === id);
  }

  getByCategory(category: NewsCategory | 'All'): NewsArticle[] {
    if (category === 'All') return this.news;
    return this.news.filter(n => n.category === category);
  }

  searchNews(query: string): NewsArticle[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.news;
    return this.news.filter(n => 
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.tags.some(t => t.toLowerCase().includes(q))
    );
  }
}

export const newsService = new NewsService();

