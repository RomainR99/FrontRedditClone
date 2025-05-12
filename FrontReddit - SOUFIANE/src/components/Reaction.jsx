const handleReaction = (emoji) => {
    const updated = {
      ...reactions,
      [emoji]: (reactions[emoji] || 0) + 1,
    };
    setReactions(updated);
    localStorage.setItem(`reactions-${postId}`, JSON.stringify(updated));
  };
  