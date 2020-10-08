import React from "react";
import {
  Typography,
  Card,
  makeStyles,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  IconButton,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
// import styles from '../../styles/searchResult.module.css'
import smapleImg from "../../test/img/sample.png";

// const useStyles: any = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

@inject("store")
@observer
class searchResult extends React.Component {
  render() {
    const { store }: any = this.props;
    const classes: any = this.props;
    return (
      <div>
        {toJS(store).searching.data.thumb.map((res: any, index: any) => {
          return (
            <div
              style={{
                display: "inline-block",
                justifyContent: "center",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              <Card style={{ width: 345 }} variant="elevation">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={res}
                    title={toJS(store).searching.data.title[index]}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {`${toJS(store).searching.data.title[index]}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`${toJS(store).searching.data.descrip[index]}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <YouTubeIcon
                      onClick={(e: any) =>
                        window.open(
                          `${toJS(store).searching.data.link[index]}`,
                          "_blank",
                          "noopener, noreferrer"
                        )
                      }
                    />
                  </IconButton>
                  <IconButton aria-label="share">
                    <CloudDownloadIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default searchResult;
