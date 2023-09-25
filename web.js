const fs=require('fs');
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');
const port=process.env.PORT||8001;
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const upload = multer({
  dest: 'client/public/uploads/' ,
});
const argon2 = require('argon2');


app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
app.options('*', cors());


const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    dateStrings: "date"
  });
  
connection.connect();

const options = {
  host: 'conf.host',
  port: conf.port,
  user: 'conf.user',
  password: 'conf.password',
  database: 'conf.database',
}

// Express session configuration
const sessionStore = new MySQLStore({
  expiration: 43200000, // 세션의 만료 시간 설정 (예: 1일)
  schema: {
    tableName: 'rozeboard.session', // 세션 테이블 이름
    columnNames: {
      session_id: 'session_id', // 세션 ID 열 이름
      expires: 'expires', // 만료 시간 열 이름
      data: 'data', // 데이터 열 이름
    }
  },
  ...options,
}, connection);


// Set up session middleware
app.use(
  session({
    secret: 'zero871026!', // 세션 암호화를 위한 비밀 키
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);


/*app.post('/api/upload', upload.single('file'), (req, res) => {
  const { name } = req.body;
  const imageUrl = req.file.filename;
  // 이미지 업로드 후, imageUrl을 클라이언트로 응답합니다.
  res.json({ imageUrl });
});
*/
  
app.get('/api/boards',(req, res)=>{
    connection.query(
      "SELECT * FROM rozeboard.quickboard ORDER BY idx DESC;",
      (err, rows, fields)=>{
        res.json(rows);
      }
    )
});


app.post('/api/boards', async (req, res) => {
  const { name, subject, content, date, password } = req.body;
  
  try {
    const hashedPassword = await argon2.hash(password); // 비밀번호를 해싱

    connection.query(
      "INSERT INTO rozeboard.quickboard (name, subject, content, date, password) VALUES (?, ?, ?, ?, ?)",
      [name, subject, content, date, hashedPassword],
      (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          const insertedId = result.insertId;
          console.log(insertedId);
          connection.query(
            "SELECT * FROM rozeboard.quickboard WHERE idx = ?",
            [insertedId],
            (err, rows) => {
              if (err) {
                res.status(500).send(err.message);
              } else {
                res.json(rows[0]);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error('비밀번호 해싱 실패:', error);
    res.status(500).send('에러가 발생했습니다.');
  }
});


app.get('/api/boards/:idx', (req, res) => {
  const idx = req.params.idx;
  connection.query(
    "SELECT * FROM rozeboard.quickboard WHERE idx = ?",
    [idx],
    (err, rows, fields) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(rows[0]);
      }
    }
  )
});

app.delete('/api/boards/:idx', (req, res) => {
  const idx = req.params.idx;
  connection.query(
    "DELETE FROM rozeboard.quickboard WHERE idx = ?",
    [idx],
    (err, rows, fields) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(rows);
      }
    }
  )
});

app.delete('/api/commentboards/:coboardnum', (req, res) => {
  const coboardnum = req.params.coboardnum;
  connection.query(
    "DELETE FROM rozeboard.boardcomment WHERE coboardnum = ?",
    [coboardnum],
    (err, rows, fields) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(rows);
      }
    }
  )
});

app.put('/api/boards/:idx', (req, res) => {
  const idx = req.params.idx;
  const { content, date } = req.body;
  connection.query(
    "UPDATE rozeboard.quickboard SET content = ?, date = ? WHERE idx = ?",
    [content, date, idx],
    (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        connection.query(
          "SELECT * FROM rozeboard.quickboard WHERE idx = ?",
          [idx],
          (err, rows) => {
            if (err) {
              res.status(500).send(err.message);
            } else {
              res.json(rows[0]);
            }
          }
        );
      }
    }
  );
});

app.put('/api/commentboards/:coboardnum', (req, res) => {
  const coboardnum = req.params.coboardnum;
  const { comment, commentdate } = req.body;
  connection.query(
    "UPDATE rozeboard.boardcomment SET comment = ?, commentdate = ? WHERE coboardnum = ?",
    [comment, commentdate, coboardnum],
    (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        connection.query(
          "SELECT * FROM rozeboard.boardcomment WHERE coboardnum = ?",
          [coboardnum],
          (err, rows) => {
            if (err) {
              res.status(500).send(err.message);
            } else {
              res.json(rows[0]);
            }
          }
        );
      }
    }
  );
});


app.post('/api/boards/:idx/comments', async (req, res) => {
  const idx = req.params.idx;
  const { username, comment, commentdate, commentpw } = req.body;

  try {
    const hashedCommentPw = await argon2.hash(commentpw); // 비밀번호 해시화

    connection.query(
      "INSERT INTO rozeboard.boardcomment (idx, username, comment, commentdate, commentpw) VALUES (?, ?, ?, ?, ?)",
      [idx, username, comment, commentdate, hashedCommentPw],
      (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          connection.query(
            "SELECT * FROM rozeboard.boardcomment WHERE idx = ? ORDER BY coboardnum DESC",
            [idx],
            (err, rows) => {
              if (err) {
                res.status(500).send(err.message);
              } else {
                res.json(rows[0]);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error('비밀번호 해싱 실패:', error);
    res.status(500).send('에러가 발생했습니다.');
  }
});

app.get('/api/boards/:idx/comments', (req, res) => {
  const idx = req.params.idx;
  connection.query(
    "SELECT * FROM rozeboard.boardcomment WHERE idx = ?",
    [idx],
    (err, rows, fields) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(rows);
      }
    }
  )
});

app.post('/api/:idx/checkPassword', async (req, res) => {
  const { password } = req.body;
  const idx = req.params.idx;
  try {
    // 테이블에서 해당 인덱스의 비밀번호를 가져옴 (이 부분은 필요에 맞게 수정)
    connection.query(
      'SELECT password FROM rozeboard.quickboard WHERE idx = ?',
      [idx],
      async (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('에러가 발생했습니다.');
        } else {
          if (results.length > 0) {
            const hashedPw = results[0].password; // 서버에서 가져온 암호화된 비밀번호

            const valid = await argon2.verify(hashedPw, password); // 비밀번호 검증

            res.json({ valid });
          } else {
            res.json({ valid: false });
          }
        }
      }
    );
  } catch (error) {
    console.error('비밀번호 검증 실패:', error);
    res.status(500).send('에러가 발생했습니다.');
  }
});

app.post('/api/:coboardnum/checkcoPassword', async (req, res) => {
  const { commentpw } = req.body;
  const coboardnum = req.params.coboardnum;
  try {
    // 테이블에서 해당 인덱스의 비밀번호를 가져옴 (이 부분은 필요에 맞게 수정)
    connection.query(
      'SELECT commentpw FROM rozeboard.boardcomment WHERE coboardnum = ?',
      [coboardnum],
      async (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('에러가 발생했습니다.');
        } else {
          if (results.length > 0) {
            const hashedPw = results[0].commentpw; // 서버에서 가져온 암호화된 비밀번호

            const valid = await argon2.verify(hashedPw, commentpw); // 비밀번호 검증

            res.json({ valid });
          } else {
            res.json({ valid: false });
          }
        }
      }
    );
  } catch (error) {
    console.error('비밀번호 검증 실패:', error);
    res.status(500).send('에러가 발생했습니다.');
  }
});


app.get("/api/posts", (req, res) => {
  const sqlQuery = "SELECT * FROM rozeboard.posts WHERE board = ? ORDER BY id DESC;";
  const board = req.query.board;

  connection.query(sqlQuery, [board], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal server error");
      return;
    }
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const thumb = req.body.thumb;
  const board = req.body.board;
  const sqlQuery = "INSERT INTO rozeboard.posts (title, content, thumb, board) VALUES (?,?,?,?)";
  connection.query(sqlQuery, [title, content, thumb, board], (err, result) => {
      res.send('success!');
  });
});

app.get('/api/postslength', (req, res) => {
  const sqlQuery = 'SELECT board, COUNT(*) as count FROM rozeboard.posts GROUP BY board;';

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send(result);
  });
});

app.get('/api/searchPosts', (req, res) => {
  const { board, title } = req.query;
  const likePattern = `%${title}%`;
  const query = `SELECT * FROM rozeboard.posts WHERE board = ? AND title LIKE ?`;

  connection.query(query, [board, likePattern], (error, results) => {
    if (error) {
      console.error('Failed to fetch posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } else {
      res.json({ posts: results });
    }
  });
});


app.put('/api/updatepost/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, thumb } = req.body;
  const query = `UPDATE rozeboard.posts SET title = ?, content = ?, thumb = ? WHERE id = ?`;

  connection.query(query, [title, content, thumb, id], (error, results) => {
    if (error) {
      console.error('Failed to update post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    } else {
      res.json({ message: 'Post updated successfully' });
    }
  });
});


app.post('/api/login', (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  connection.query(
    `SELECT * FROM rozeboard.users WHERE id = '${id}'`,
    async (err, results, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send('에러가 발생했습니다.');
      } else if (results.length > 0) {
        const storedPw = results[0].pw; // 데이터베이스에 저장된 해시된 비밀번호
        const isMatch = await comparePassword(pw, storedPw); // 비밀번호 비교

        if (isMatch) {
          req.session.data = id; // 세션에 사용자 ID 저장
          res.send('로그인 성공');
        } else {
          res.send('ID 또는 PW가 올바르지 않습니다.');
        }
      } else {
        res.send('ID 또는 PW가 올바르지 않습니다.');
      }
    }
  );
});

// 비밀번호 비교 함수
async function comparePassword(password, hashedPassword) {
  try {
    const isMatch = await argon2.verify(hashedPassword, password);
    return isMatch;
  } catch (error) {
    console.error('비밀번호 비교 실패:', error);
    throw new Error('비밀번호 비교 실패');
  }
}

app.post('/api/join', async (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const email = req.body.email;

  try {
    const hashedPw = await hashPassword(pw); // 비밀번호를 해싱

    connection.query(
      `INSERT INTO rozeboard.users (id, pw, email) VALUES ('${id}', '${hashedPw}', '${email}')`,
      (err, results, fields) => {
        if (err) {
          console.error(err);
          res.send('에러가 발생했습니다.');
        } else {
          req.session.data = id; // 세션에 사용자 ID 저장
          res.send('가입 완료');
        }
      }
    );
  } catch (error) {
    console.error('비밀번호 해싱 실패:', error);
    res.status(500).send('에러가 발생했습니다.');
  }
});

app.post('/api/checkUserId', (req, res) => {
  const id = req.body.id;

  connection.query(`SELECT * FROM rozeboard.users WHERE id = '${id}'`, (err, results, fields) => {
    if (err) {
      console.error(err);
      res.send('에러가 발생했습니다.');
    } else if (results.length > 0) {
      res.send('이미 사용중인 ID입니다!');
    } else {
      res.send('사용 가능한 ID입니다.');
    }
  });
});

app.get('/api/getSessionData', (req, res) => {
  const userId = req.session.data; // 세션에서 사용자 ID 가져오기

  // 클라이언트에 세션 데이터 응답
  res.json({ userId });
});

app.post('/api/logout', (req, res) => {
  // 세션 데이터 초기화
  req.session.destroy((error) => {
    if (error) {
      console.error('Failed to destroy session:', error);
      res.status(500).send('Failed to logout');
    } else {
      res.send('Logout success');
    }
  });
});


// 비밀번호 해싱 함수
async function hashPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    throw new Error('비밀번호 해싱 실패');
  }
}

app.post("/api/snapshot", (req, res) => {
  const { year, season, content } = req.body;

  // MySQL 쿼리 실행
  const query = `INSERT INTO rozeboard.snapshot (year, season, content) VALUES (?, ?, ?)`;
  connection.query(query, [year, season, content], (error, results) => {
    if (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: "Upload failed" });
    } else {
      console.log("Upload successful");
      res.status(200).json({ message: "Upload successful" });
    }
  });
});

app.get('/api/snapshot', (req, res) => {
  // 요청 파라미터에서 연도와 시즌 가져오기
  const { year, season } = req.query;

  // rozeboard.snapshot 테이블에서 데이터 가져오기
  const query = `SELECT * FROM snapshot WHERE year = ? AND season = ?`;
  connection.query(query, [year, season], (error, results) => {
    if (error) {
      console.error('Error fetching snapshot data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const snapshotData = results[0];
        res.json(snapshotData);
      } else {
        res.status(404).json({ message: 'coming soon' });
      }
    }
  });
});

app.get('/api/snapshotlength', (req, res) => {
  try {
    // 데이터베이스에서 게시글의 총 개수 가져오기
    connection.query('SELECT COUNT(*) as count FROM rozeboard.snapshot', (error, results) => {
      if (error) {
        console.error('Error fetching total post count:', error);
        res.status(500).json({ error: 'An error occurred while fetching total post count' });
        return;
      }

      res.json({ count: results[0].count });
    });
  } catch (error) {
    console.error('Error fetching total post count:', error);
    res.status(500).json({ error: 'An error occurred while fetching total post count' });
  }
});

app.get('/api/sanpbannerlenght', (req, res) => {
  const query = 'SELECT DISTINCT banneryear FROM rozeboard.snapbanner';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching banner years:', error);
      res.sendStatus(500);
      return;
    }
    const uniqueBannerYears = results.map(result => result.banneryear);
    const totalCount = uniqueBannerYears.length;
    res.json({ banneryear: uniqueBannerYears, totalCount });
  });
});


app.post('/api/snapbanner', (req, res) => {
  const { bannerthumb, banneryear, bannerseason, bannerbutton, bannercomment } = req.body;

  const query = 'INSERT INTO rozeboard.snapbanner (bannerthumb, banneryear, bannerseason, bannerbutton, bannercomment) VALUES (?, ?, ?, ?, ?)';
  const values = [bannerthumb, banneryear, bannerseason, bannerbutton, bannercomment];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data to MySQL:', err);
      res.status(500).json({ error: 'Failed to insert data to MySQL' });
    } else {
      console.log('Data inserted to MySQL');
      res.status(200).json({ success: true });
    }
  });
});

app.get('/api/snapbanner', (req, res) => {
  const query = 'SELECT * FROM rozeboard.snapbanner';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching banners from MySQL:', err);
      res.status(500).json({ error: 'Failed to fetch banners from MySQL' });
    } else {
      console.log('Banners fetched from MySQL');
      res.status(200).json(results);
    }
  });
});

app.get('/api/snapyear', (req, res) => {
  // 요청 파라미터에서 연도와 시즌 가져오기
  const { banneryear } = req.query;
  // rozeboard.snapshot 테이블에서 데이터 가져오기
  const query = `SELECT * FROM rozeboard.snapbanner WHERE banneryear = ?`;
  connection.query(query, [banneryear], (error, results) => {
    if (error) {
      console.error('Error fetching snapshot data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.json(results); // 모든 결과를 전송
      } else {
        res.status(404).json({ message: 'coming soon' });
      }
    }
  });
});


app.get('/api/searchSnapbanner', (req, res) => {
  const {banneryear} = req.query;
  const query = `SELECT * FROM rozeboard.snapbanner WHERE banneryear = ?`;

  connection.query(query, [banneryear], (error, results) => {
    if (error) {
      console.error('Failed to fetch posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } else {
      res.json({ posts: results });
    }
  });
});

app.put('/api/updateSnapbanner/:id', (req, res) => {
  const { id } = req.params;
  const { bannerthumb, banneryear, bannerseason, bannerbutton, bannercomment} = req.body;
  const query = `UPDATE rozeboard.snapbanner SET bannerthumb = ?, banneryear = ?, bannerseason = ?, bannerbutton=?, bannercomment=? WHERE id = ?`;

  connection.query(query, [bannerthumb, banneryear, bannerseason, bannerbutton, bannercomment, id], (error, results) => {
    if (error) {
      console.error('Failed to update post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    } else {
      res.json({ message: 'Post updated successfully' });
    }
  });
});

app.get('/api/searchSnapcontent', (req, res) => {
  const {year} = req.query;
  const query = `SELECT * FROM rozeboard.snapshot WHERE year = ?`;

  connection.query(query, [year], (error, results) => {
    if (error) {
      console.error('Failed to fetch posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } else {
      res.json({ posts: results });
    }
  });
});

app.put('/api/updateSnapcontent/:id', (req, res) => {
  const { id } = req.params;
  const { year, season, content} = req.body;
  const query = `UPDATE rozeboard.snapshot SET year = ?, season = ?, content = ? WHERE id = ?`;

  connection.query(query, [year, season, content, id], (error, results) => {
    if (error) {
      console.error('Failed to update post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    } else {
      res.json({ message: 'Post updated successfully' });
    }
  });
});

app.post('/api/rmbanner/', (req, res) => {
  const { rmbanner, rmsubject, rmcontent } = req.body;

  // Insert the data into the rmbanner table
  const query = 'INSERT INTO rozeboard.rozemary (rmbanner, rmsubject, rmcontent) VALUES (?, ?, ?)';
  connection.query(query, [rmbanner, rmsubject, rmcontent], (error, results) => {
    if (error) {
      console.error('Failed to upload RM banner:', error);
      res.status(500).json({ error: 'Failed to upload RM banner' });
    } else {
      console.log('RM banner uploaded successfully!');
      res.status(200).json({ message: 'RM banner uploaded successfully' });
    }
  });
});

app.get('/api/rmbanners/', (req, res) => {
  // Retrieve data from the 'rozebanner' table in your MySQL database
  const query = 'SELECT * FROM rozeboard.rozemary';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Failed to fetch RMbanners:', error);
      res.status(500).json({ error: 'Failed to fetch RMbanners' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/rmbannerlength', (req, res) => {
  try {
    // 데이터베이스에서 게시글의 총 개수 가져오기
    connection.query('SELECT COUNT(*) as count FROM rozeboard.rozemary', (error, results) => {
      if (error) {
        console.error('Error fetching total post count:', error);
        res.status(500).json({ error: 'An error occurred while fetching total post count' });
        return;
      }

      res.json({ count: results[0].count });
    });
  } catch (error) {
    console.error('Error fetching total post count:', error);
    res.status(500).json({ error: 'An error occurred while fetching total post count' });
  }
});

app.get('/api/searchrmbanner', (req, res) => {
  const { rmsubject } = req.query;
  const likePattern = `%${rmsubject}%`;
  const query = `SELECT * FROM rozeboard.rozemary WHERE rmsubject LIKE ?`;

  connection.query(query, [likePattern], (error, results) => {
    if (error) {
      console.error('Failed to fetch posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    } else {
      res.json({ posts: results });
    }
  });
});

app.put('/api/updatermbanner/:idx', (req, res) => {
  const { idx } = req.params;
  const { rmbanner, rmsubject, rmcontent } = req.body;
  const query = `UPDATE rozeboard.rozemary SET rmbanner = ?, rmsubject = ?, rmcontent = ? WHERE idx = ?`;

  connection.query(query, [rmbanner, rmsubject, rmcontent, idx], (error, results) => {
    if (error) {
      console.error('Failed to update post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    } else {
      res.json({ message: 'Post updated successfully' });
    }
  });
});


/*app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use(express.static(path.join(__dirname, "/client/build")));
*/

app.listen(port,()=>console.log(`Listening on port ${port}`)); 