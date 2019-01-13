import React from "react";
import { withRouter } from "react-router";
import * as api from "src/api";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import CourseCard from "./components/CourseCard";
import { Tag, Menu, Button, message } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import * as styles from "./styles.scss";

const { CheckableTag } = Tag;

const filters = {
  0: "Available in this semester",
  1: "Pass / Fail",
  2: "Read as PE",
  3: "Read as UE"
  // 4: "No final exam"
};

class PageBrowse extends React.Component {
  constructor() {
    super();
    this.state = {
      countdown: 0,
      keywords: "",
      selectedTags: [],
      sort: "0",
      result: [],
      loaded: [],
      isSearching: false
    };
  }

  loadMore = () => {
    const { loaded, result } = this.state;
    this.setState({
      ...this.state,
      loaded: loaded.concat(
        result.slice(
          loaded.length,
          loaded.length + Math.min(10, result.length - loaded.length)
        )
      )
    });
  };

  handleSortSelect = e => {
    const key = e.key.split("item_")[1];
    this.setState({ sort: key });
  };

  // menu must be declared after handleSortSelect
  menu = (
    <Menu onClick={this.handleSortSelect}>
      <Menu.Item>
        <span id="sort_0">Like</span>
      </Menu.Item>
      <Menu.Item>
        <span id="sort_1">Easy</span>
      </Menu.Item>
      <Menu.Item>
        <span id="sort_2">Useful</span>
      </Menu.Item>
      {/* <Menu.Item>
        <span id="sort_3">Comments</span>
      </Menu.Item> */}
    </Menu>
  );

  handleTagClick = (key, checked) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, key]
      : selectedTags.filter(t => t !== key);
    this.setState({ ...this.state, selectedTags: nextSelectedTags });
  };

  requestSearch = () => {
    const { keywords, selectedTags, sort } = this.state;
    const { history } = this.props;
    let trimmedKeywords = keywords.trim();
    if (trimmedKeywords === "" && selectedTags.length === 0) {
      message.error("Please provide more information!");
      return true;
    }
    // build query
    const encodeKeywords = encodeURIComponent(keywords);
    const encodeFilters = encodeURIComponent(selectedTags.join(" "));
    const query = `${encodeKeywords}&filter=${encodeFilters}&sort=${sort}`;
    // start searching
    history.replace({
      ...history.location,
      pathname: "/browse",
      search: "search=" + query
    });
    this.startSearch(query);
  };

  handleKeydown = e => {
    if (e.keyCode !== 13) return false; // if key is not ENTER
    this.requestSearch();
  };

  handleButtonClick = () => {
    this.requestSearch();
  };

  startSearch = async query => {
    this.setState({ ...this.state, isSearching: true, countdown: 10 });
    try {
      const {
        data: { data: data }
      } = await api.searchCourses(query);
      this.setState({
        ...this.state,
        isSearching: false,
        result: data || [],
        loaded: (data && data.slice(0, Math.min(data.length, 10))) || []
      });
    } catch (err) {
      this.setState({
        ...this.state,
        isSearching: false
      });
    }
  };

  handleInput = e => {
    this.setState({ ...this.state, keywords: e.target.value });
  };

  componentDidMount() {
    const searchDOM = document.querySelector(".".concat(styles.searchInput));
    searchDOM.addEventListener("keydown", this.handleKeydown);
    const containerDOM = document.querySelector(
      ".".concat(styles.rightContainer)
    );
    containerDOM.addEventListener("scroll", this.handleScroll);
    // start timing
    setInterval(() => {
      if (this.state.countdown > 0)
        this.setState({ ...this.state, countdown: this.state.countdown - 1 });
    }, 1000);
    // restore state
    const {
      location: { search }
    } = this.props;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!search) {
      const params = new URLSearchParams(search);
      if (!params.get("search") && !params.get("filter")) return;
      const query = decodeURIComponent(
        search.split("search=") &&
          search.split("search=").slice(1) &&
          search
            .split("search=")
            .slice(1)
            .join("")
      );
      this.startSearch(query);
      this.setState({
        ...this.state,
        countdown: 5,
        keywords: params.get("search"),
        selectedTags: params.get("filter")
          ? params.get("filter").split(" ")
          : []
      });
    }
  }

  componentWillUnmount() {
    const searchDOM = document.querySelector(".".concat(styles.searchInput));
    searchDOM.removeEventListener("keydown", this.handleKeydown);
  }

  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.label}>Do you have any keywords?</div>
            <div className={styles.searchContainer}>
              <input
                className={styles.searchInput}
                defaultValue={this.state.keywords}
                placeholder="Calculus, ES8006..."
                onChange={this.handleInput}
              />
            </div>
            <div className={styles.label}>Add filters</div>
            <div className={styles.tagContainer}>
              {Object.keys(filters).map(key => (
                <CheckableTag
                  className={styles.tag}
                  key={key}
                  checked={this.state.selectedTags.includes(key)}
                  onChange={checked => this.handleTagClick(key, checked)}
                >
                  {filters[key]}
                </CheckableTag>
              ))}
            </div>
            {/* <div className={styles.label}>
              <span style={{ marginRight: "1rem" }}>
                Customize your search result:{" "}
              </span>
              <Dropdown overlay={this.menu} className={styles.dropdown}>
                <Button>
                  Sort by <Icon type="down" />
                </Button>
              </Dropdown>
            </div> */}
            <div className={styles.buttonContainer}>
              <Button
                className={styles.searchButton}
                type="primary"
                disabled={this.state.isSearching || this.state.countdown > 0}
                onClick={this.handleButtonClick}
              >
                {this.state.isSearching
                  ? "Searching..."
                  : this.state.countdown === 0
                    ? "Search"
                    : `Search (${this.state.countdown})`}
              </Button>
            </div>
            <div className={styles.credits}>
              Design inspired by{" "}
              <a
                href="https://careers.google.com/jobs/results"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Careers
              </a>
            </div>
          </div>
          <div className={styles.rightContainer}>
            {this.state.isSearching ? (
              ["", "", "", ""].map((_, key) => (
                <CourseCard key={key} skeleton />
              ))
            ) : this.state.result.length > 0 ? (
              <React.Fragment>
                <h1 style={{ marginBottom: 0 }}>
                  {this.state.result.length} results
                </h1>
                {this.state.loaded.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
                <div
                  className={styles.loadMoreContainer}
                  style={{
                    display:
                      this.state.loaded.length < this.state.result.length
                        ? "block"
                        : "none",
                    textAlign: "left"
                  }}
                >
                  <Button onClick={this.loadMore}>Load more</Button>
                </div>
                {/* <InfiniteScroll
                  dataLength={this.state.result.length}
                  next={this.loadMore}
                  hasMore={true}
                  loader={<CourseCard skeleton />}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                  scrollableTarget={document.querySelector(
                    "." + styles.rightContainer
                  )}
                >
                  {this.state.loaded.map((course, index) => (
                    <CourseCard key={index} {...course} />
                  ))}
                </InfiniteScroll> */}
              </React.Fragment>
            ) : (
              <h1>No result</h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(PageBrowse);
