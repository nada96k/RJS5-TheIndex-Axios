import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const author = response.data;
      this.setState({ authors: author });
      this.setState({ loading: false });
      console.log("RESPONSE!!!", author);
    } catch (err) {
      console.log("gotcha!", err);
    }
  }

  AuthorListFn = () => {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <AuthorsList
        authors={this.state.authors}
        selectAuthor={this.selectAuthor}
      />
    );
  };

  selectAuthor = async author => {
    const response = await axios.get(
      `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
    );
    const madri = response.data;
    this.setState({ loading: true });
    this.setState({ currentAuthor: madri });
    // console.log("currentauthor", response);
    this.setState({ loading: false });
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
