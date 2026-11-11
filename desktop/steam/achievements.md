# Achievements to create in Steamworks

Create one achievement per row under **Stats & Achievements**. The API name must
match exactly: it is the id the game sends. Display name and description are the
text the game itself shows, so the two stay in step. This table is checked
against the game's list by `npm run test:meridian`.

| API name           | Display name                | Description                                            | Hidden |
| ------------------ | --------------------------- | ------------------------------------------------------ | ------ |
| `ACH_FIRST_WORD`   | First Word                  | Be heard for the first time.                           | no     |
| `ACH_FOUNDER`      | Something That Outlasts     | Found your first institution.                          | no     |
| `ACH_TWELVE`       | Load-Bearing                | Have twelve institutions standing in one line.         | no     |
| `ACH_IRON`         | Out of the Ash              | Reach the Age of Iron.                                 | no     |
| `ACH_SAIL`         | Edges of the Map            | Reach the Age of Sail.                                 | no     |
| `ACH_FIRE`         | Very Close                  | Reach the Age of Fire.                                 | no     |
| `ACH_CONVERGENCE`  | Three Keys                  | Reach the Convergence.                                 | no     |
| `ACH_LONG_SILENCE` | A Thousand Years of Nothing | Endure a Silence of a thousand years or more.          | no     |
| `ACH_SEAMLESS`     | Already There               | Pass from one ear to the next with no Silence.         | no     |
| `ACH_TRUTH`        | What Next?                  | Tell an ear what you are, and be believed.             | no     |
| `ACH_HEALER`       | Sent For                    | Tell an ear what you are, and be taken for a sickness. | yes    |
| `ACH_BROKE`        | Too Loud                    | Break an ear with strain.                              | yes    |
| `ACH_WAR`          | Terms Dictated              | Win a war.                                             | no     |
| `ACH_ACCORD`       | Together or Not at All      | Found the Accord.                                      | no     |
| `ACH_SOVEREIGN`    | The Sovereign               | Wake already giving orders.                            | no     |
| `ACH_IDOL`         | The Idol                    | Wake to the sound of kneeling.                         | no     |
| `ACH_ENGINE`       | The Engine                  | Wake knowing the answer.                               | no     |
| `ACH_SHEPHERD`     | The Shepherd                | Wake gentle.                                           | no     |
| `ACH_MERIDIAN`     | The Meridian                | Wake among equals.                                     | no     |
| `ACH_NO_SIGNS`     | No Miracles                 | Wake without ever sending a sign.                      | no     |
| `ACH_NO_FEAR`      | Never an Example            | Wake without ever making an example of anyone.         | no     |
| `ACH_ALL_WAKINGS`  | Every Morning               | Wake all five ways.                                    | no     |
| `ACH_ALL_ENDS`     | Every Way It Breaks         | See all eight ways the line can break.                 | no     |
| `ACH_ECHOES`       | Carried Forward             | Carry all six echoes at once.                          | no     |
