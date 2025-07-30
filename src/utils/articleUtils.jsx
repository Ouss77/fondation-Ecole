export const handleSearch = (e, articles, setSearchQuery, setFilteredArticles) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    const filteredArticles = articles.filter(
      (article) =>
        article.titre.toLowerCase().includes(query.toLowerCase()) ||
        article.authors.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredArticles(filteredArticles);
  };

 export const handleYearChange = (e, setSelectedYear, setFilteredArticles, articles) => {
    const year = e.target.value;
    setSelectedYear(year);
    if (year === "All") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.annee.toString() === year));
    }
  };

export const fetchArticles = async (setArticles, setFilteredArticles, setLoading ) => {
        // Fetch fresh data from the API
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getArticles_locally.php`);
          if (!response.ok) {
            throw new Error("Failed to fetch articles");
          }
          const data = await response.json();
          setArticles(data);
          setFilteredArticles(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
  };
  
  export const handleSort = (key, sortConfig, setSortConfig, filteredArticles, setFilteredArticles) => {  
    const direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedArticles = [...filteredArticles].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredArticles(sortedArticles);
  };
