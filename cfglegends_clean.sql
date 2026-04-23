--
-- PostgreSQL database dump
--

\restrict 3s7QABfR7YUViXcsRfFAffnZUsJx1ppPzZJFYHm4gT3hacDhoHnnat2RTiEjZCY

-- Dumped from database version 17.8 (130b160)
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_audit_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_audit_logs (
    id integer NOT NULL,
    admin_user_id integer NOT NULL,
    entity_type character varying(50) NOT NULL,
    entity_id character varying(100),
    action character varying(30) NOT NULL,
    summary text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: admin_audit_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_audit_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_audit_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_audit_logs_id_seq OWNED BY public.admin_audit_logs.id;


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    is_master boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    card_number integer NOT NULL,
    type character varying(20) NOT NULL,
    rarity character varying(20) DEFAULT 'normal'::character varying NOT NULL,
    ansage integer,
    chill integer,
    dienstjahre integer,
    archetype character varying(100),
    subjects text,
    effect text,
    image_url character varying(500) NOT NULL,
    published boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: downloads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.downloads (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    description text,
    file_url character varying(500) NOT NULL,
    file_type character varying(50),
    file_size integer,
    published boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: downloads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.downloads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: downloads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.downloads_id_seq OWNED BY public.downloads.id;


--
-- Name: limited_cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.limited_cards (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    max_copies integer DEFAULT 1 NOT NULL,
    reason text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: limited_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.limited_cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: limited_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.limited_cards_id_seq OWNED BY public.limited_cards.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    content text NOT NULL,
    published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: admin_audit_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_audit_logs ALTER COLUMN id SET DEFAULT nextval('public.admin_audit_logs_id_seq'::regclass);


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: downloads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.downloads ALTER COLUMN id SET DEFAULT nextval('public.downloads_id_seq'::regclass);


--
-- Name: limited_cards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.limited_cards ALTER COLUMN id SET DEFAULT nextval('public.limited_cards_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Data for Name: admin_audit_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_audit_logs (id, admin_user_id, entity_type, entity_id, action, summary, created_at) FROM stdin;
1	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 13:04:54.66061+00
2	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 13:15:18.865437+00
3	1	admins	1	logout	Admin-Logout von tjark.schulte@gy-cfg.de	2026-04-20 13:32:06.401798+00
4	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 16:25:59.457718+00
5	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 16:29:29.471852+00
6	1	admins	1	update	Admin-Konto aktualisiert: tjark.schulte@gy-cfg.de -> tjark.schulte@gy-cfg.de (Master), Passwort geändert	2026-04-20 16:29:41.624232+00
7	1	admins	1	logout	Admin-Logout von tjark.schulte@gy-cfg.de	2026-04-20 16:29:44.041276+00
8	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 16:29:59.387641+00
9	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 16:59:31.694897+00
10	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 17:07:55.295714+00
11	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-20 17:15:13.750702+00
12	1	cards	\N	create	Kartenbild hochgeladen: cards/121.png (Karte #121)	2026-04-20 17:15:34.766424+00
13	1	cards	244	create	Karte erstellt: Backside (#121)	2026-04-20 17:15:50.47012+00
14	1	cards	244	delete	Karte gelöscht: Backside	2026-04-20 17:16:21.956174+00
15	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-21 05:47:22.509402+00
16	1	admins	1	logout	Admin-Logout von tjark.schulte@gy-cfg.de	2026-04-21 05:48:10.244332+00
17	1	admins	1	login	Admin-Login von tjark.schulte@gy-cfg.de	2026-04-21 08:47:21.070137+00
18	1	admins	2	create	Admin-Konto erstellt: felix.urban@gy-cfg.de	2026-04-21 08:48:01.77795+00
19	2	admins	2	login	Admin-Login von felix.urban@gy-cfg.de	2026-04-21 08:48:34.047706+00
20	1	news	1	update	News aktualisiert: CFG Legends ist da!	2026-04-21 09:05:20.200466+00
21	2	admins	2	login	Admin-Login von felix.urban@gy-cfg.de	2026-04-21 09:07:15.698741+00
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_users (id, email, password_hash, is_master, created_at, updated_at) FROM stdin;
1	tjark.schulte@gy-cfg.de	4d4d87a8458eb1592ff95ac40c5bcb68:7533cf38b75878d6df56c514c06723d864f6ca57220f0e0761f3994aca1c4a311d05b2e55db2c990e55742572421ff2f61b05218c4fc43d56788795a02e3a584	t	2026-04-20 13:04:54.629351+00	2026-04-20 16:29:41.574+00
2	felix.urban@gy-cfg.de	e954d7bf9ee23ac70b90069aa4c887d3:0e5955a293303ebda9fbc882ea443dbec6c8f8d367b72767ba623cdaf5271f1bd412e23e2e18702c42af3c1a96714d410c81a166c75d12e1bc8d4cb4902d66bd	f	2026-04-21 08:48:01.676417+00	2026-04-21 08:48:01.676417+00
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cards (id, name, card_number, type, rarity, ansage, chill, dienstjahre, archetype, subjects, effect, image_url, published, created_at, updated_at) FROM stdin;
151	Herr Happe	28	lehrer	normal	7	3	4	MINT	Philo,Astronomie,Mathe,Physik	Physikshow\r\nWenn du diese Karte einstellst: Wähle 1 Lehrer auf dem Feld; ändere seinen Modus. Falls in diesem Zug ein Lehrer seinen Modus geändert hat, erhält diese Karte bis zum Ende des Zuges einmalig +2 Ansage. Wenn diese Karte eine Lehrerkarte im Chillmodus angreift und ihre Ansage höher ist als deren Chill, verliert dein Gegner Lehrkraft in Höhe der Differenz.	/cards/28.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:16:48.99+00
125	Frau Drübert	2	lehrer	golden	10	0	28	Schulleitung	Chemie,Mathe	Haushaltskontrolle\r\nWenn du diese Karte einstellst: Dein Gegner wirft zufällig 1 Karte ab. Falls diese offene Karte von deinem Feld in den Ruhestand geschickt würde: Du kannst sie in dein Deck zurückmischen; ziehe 1 Karte.	/cards/2.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:06:57.213+00
124	Herr Mertens	1	lehrer	golden	10	0	26	Schulleitung	Biologie,Chemie	Die ultimative Verantwortung\r\nSolange diese Karte offen liegt, können deine anderen Lehrer nicht durch gegnerische Ereigniskarten in den Ruhestand geschickt werden. Einmal pro Spielzug, wenn ein Effekt aktiviert wird: Zahle 3 Lehrkraft; annulliere ihn.	/cards/1.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:06:25.679+00
126	Frau Bühne	3	lehrer	normal	3	7	6	School's Out	Kunst	Initiative\r\nDu kannst 1 anderen School's-Out-Lehrer von deiner Hand im Chillmodus einstellen. Einmal pro Zug: Wähle 1 Lehrer auf dem Feld; ändere seinen Modus.	/cards/3.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:07:34.289+00
127	Herr Noack	4	lehrer	normal	3	7	6	School's Out	Mathe,Religion	Rückendeckung\r\nWenn du diese Karte einstellst: Du erhältst +2 Lehrkraft. Einmal pro Spielzug, wenn ein anderer School's-Out-Lehrer den du kontrollierst, durch Kampf in den Ruhestand geschickt würde: Du kannst stattdessen seinen Modus ändern.	/cards/4.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:07:58.699+00
128	Herr Pfeiffer	5	lehrer	normal	9	1	19	School's Out	Sport,Geschichte	Durchführung\r\nSolange du 2 andere School's-Out-Lehrer mit unterschiedlichen Namen kontrollierst, kann diese Karte in deiner Prüfungsphase 1 zusätzlichen Angriff auf eine Lehrerkarte durchführen. Wenn diese Karte einen gegnerische Lehrer durch Kampf in den Ruhestand schickt: Du kannst 1 offenen Lehrer deines Gegners in den Chillmodus ändern.	/cards/5.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:08:20.158+00
129	Frau Mattern	6	lehrer	normal	3	7	7	School's Out	Deutsch,Erdkunde,SoWi,Spanisch	Akquise\r\nWenn du diese Karte einstellst: Nimm 1 School's-Out-Lehrer von deinem Deck oder Ruhestand auf die Hand, außer Frau Mattern. Einmal pro Zug: Falls du einen anderen School's-Out-Lehrer kontrollierst, erhält 1 Lehrer, den du kontrollierst, bis zum Ende des Zuges +2 Ansage.	/cards/6.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:08:57.028+00
130	Frau Kottmann	7	lehrer	normal	7	3	15	Oberstufe	Mathe,Physik	Bücherausgabe\r\nWenn du diese Karte einstellst: Ziehe 1 Karte, dann lege 1 Karte ab. Einmal pro Zug, wenn einer deiner Oberstufe-Lehrer kämpft: Wähle 1 anderen offene Oberstufe-Lehrer, den du kontrollierst. Falls die gewählte Karte 20 oder mehr Dienstjahre hat, kann die kämpfende Karte in diesem Kampf nicht durch Kampf in den Ruhestand geschickt werden und erhält +2 Ansage.	/cards/7.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:09:29.052+00
131	Herr Israel	8	lehrer	normal	5	5	26	Oberstufe	Latein,Mathe	Abiturzulassung\r\nWenn du diese Karte einstellst: Nimm 1 Abiturklausurplan oder Kursumwahl von deinem Deck auf die Hand. Solange diese Karte offen liegt, können gegnerische Lehrer mit 4 oder weniger Ansage nicht angreifen.	/cards/8.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:09:51.471+00
132	Frau Grote	9	lehrer	normal	7	3	21	Oberstufe	Englisch,Religion,Sport	Abituraufsicht\r\nWenn du diese Karte einstellst: Du kannst 1 Abiturklausurplan, Kursumwahl oder Mündliche Nachprüfung in deinem Ruhestand auf die Hand nehmen. Einmal pro Zug, wenn ein gegnerischer Lehrer mit 6 oder weniger Ansage einen Angriff erklärt: Annulliere den Angriff.	/cards/9.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:10:22.104+00
133	Frau Kehls	10	lehrer	normal	8	2	10	Oberstufe	Latein,Spanisch	Individuelle Förderung\r\nWenn du diese Karte einstellst: Du kannst 1 anderen eigenen Lehrer auf die Hand zurückgeben. Falls du dies tust, nimm 1 Oberstufe-Lehrer von deinem Deck auf die Hand. Einmal pro Zug: Wähle 1 anderen offenen Oberstufe-Lehrer, den du kontrollierst. Er erhält bis zum Ende des Zuges +2 Ansage.	/cards/10.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:10:37.286+00
134	Frau Wattke	11	lehrer	normal	3	7	20	Oberstufe	Biologie	Nachschreibtermin\r\nWenn du diese Karte einstellst: Du kannst Mündliche Nachprüfung direkt von deinem Deck setzen. Sie kann in diesem Zug nicht aktiviert werden. Solange diese Karte offen im Chillmodus liegt, kann dein Gegner in jeder Prüfungsphase nur mit 1 Lehrer mit 7 oder mehr Ansage angreifen.	/cards/11.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:10:54.779+00
135	Herr Müller	12	lehrer	normal	3	7	22	Oberstufe	Englisch,Mathe	Klausurplanung\r\nWenn du diese Karte einstellst: Schaue dir die obersten 3 Karten deines Decks an. Nimm 1 Oberstufe-Lehrer oder 1 Ereigniskarte darunter auf die Hand. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck. Einmal pro Zug: Wähle 1 offenen Lehrer auf dem Feld mit 6 oder weniger Ansage; er kann bis zum Ende des nächsten Zuges nicht angreifen.	/cards/12.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:11:13.558+00
136	Frau Wyneken	13	lehrer	normal	8	2	21	Oberstufe	SoWi,Sport,Französisch	Beratungsgespräch\r\nWenn du diese Karte einstellst: Du kannst 1 anderen Oberstufe-Lehrer deinem Ruhestand auf die Hand nehmen. Falls du dies tust, wirf 1 Karte ab. Einmal pro Zug: Wähle 1 anderen offenen Oberstufe-Lehrer, der du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges erhält er +2 Chill. Falls er in dieser Zeit durch Kampf in den Ruhestand geschickt würde, nimm ihn zurück auf die Hand.	/cards/13.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:11:41.241+00
137	Frau Mumm	14	lehrer	normal	7	3	15	Mittelstufe	Deutsch,Sport	Mittelstufenkonferenz\r\nSolange diese Karte offen liegt, können offene Lehrer mit 7 oder mehr Ansage nicht direkt angreifen. Wenn dein Gegner den Effekt eines offenen Lehrers mit 7 oder mehr Ansage aktiviert: Du kannst diese Karte von deiner Hand abwerfen; jene Karte erhält bis zum Ende des Zuges -4 Ansage.	/cards/14.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:11:59.213+00
138	Frau Götsch	15	lehrer	normal	6	4	12	Mittelstufe	Biologie,Englisch	Kurswahl\r\nWenn diese Karte eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte ab. Einmal pro Spielzug: Wenn eine deiner offenen Lehrer in den Chillmodus geändert wird, kannst du 1 anderen offenen Lehrer wählen; bis zum Ende des Zuges kann er nicht angreifen.	/cards/15.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:12:15.165+00
139	Herr Siebrandt	16	lehrer	normal	7	3	46	Verwaltung	Deutsch,Kunst	Kursumwahl\r\nWenn du diese Karte einstellst: Wähle 1 anderen offenen Lehrer, den du kontrollierst, und 1 Lehrer mit einem anderen Namen in deinem Ruhestand. Nimm die offene Karte auf die Hand. Falls du dies tust, stelle die gewählte Karte aus deinem Ruhestand im selben Modus ein. Ihre Effekte sind bis zum Ende des Zuges annulliert. Einmal pro Zug: Du kannst 1 Karte abwerfen; ändere den Modus von 1 Lehrer auf dem Feld.	/cards/16.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:12:33.356+00
140	Frau Boeddinghaus	17	lehrer	normal	6	4	18	Verwaltung	Chemie,Mathe	Sicherheitsbegehung\r\nWenn du diese Karte einstellst: Ziehe 1 Karte, dann lege 1 Karte ab. Einmal pro Spielzug, wenn dein Gegner eine Lehrerkarte einstellt: Du kannst jene Karte in den Chillmodus ändern.	/cards/17.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:12:49.376+00
141	Herr Hillringhaus	18	lehrer	normal	5	5	22	Verwaltung	Mathe,Physik	Digitales Klassenbuch\r\nWenn du diese Karte einstellst: Schaue dir die obersten 6 Karten deines Decks an. Nimm 1 Verwaltung-Lehrer oder 1 Falle darunter auf die Hand. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck. Einmal in deinem Zug: Decke 1 verdeckte Karte des Gegners auf. Falls es eine Falle ist, kann sie in diesem Zug nicht aktiviert werden.	/cards/18.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:13:06.254+00
142	Frau Schmitz-Wimmer	19	lehrer	normal	5	5	42	Verwaltung	Latein,Mathe	Jugend präsentiert Finale\r\nWenn diese Karte eingestellt wird: Wähle 1 Lehrer, den du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges kann er nicht Ziel gegnerischer Effekte werden und erhält +1 Ansage. Falls deine eingestellten Lehrer zusammen mindestens 50 Dienstjahre zählen, ziehe 1 Karte.	/cards/19.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:13:24.765+00
143	Herr Hübschen	20	lehrer	normal	7	3	21	Verwaltung	Mathe,Physik	Vertretung\r\nWenn du diese Karte einstellst: Wähle 1 offenen Lehrer deines Gegners und 1 Lehrer in seinem Ruhestand. Schicke die offene Lehrerkarte in den Ruhestand. Falls du dies tust, stellt dein Gegner den gewählten Lehrer im Chillmodus ein. Seine Effekte sind bis zum Ende des Zuges annulliert. Wenn du diese Karte einstellst: Du kannst Antrag abgelehnt direkt von deinem Deck setzen.	/cards/20.png	t	2026-04-18 20:24:23.209923+00	2026-04-18 21:13:38.68+00
144	Frau Furkert	21	lehrer	normal	5	5	20	Erprobungsstufe	Deutsch,Erdkunde	Sicherer Start\r\nWenn diese Karte eingestellt wird: Lege 1 Entwicklungsmarke auf 1 anderen Lehrer, den du kontrollierst. Lehrer mit Entwicklungsmarke erhalten +1 Ansage und +1 Chill. Einmal pro Spielzug: Wenn ein Lehrer mit Entwicklungsmarke durch Kampf in den Ruhestand gehen würde, entferne stattdessen 1 Entwicklungsmarke von ihm und ändere ihn in den Chillmodus.	/cards/21.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:13:54.546+00
145	Herr Leermann	22	lehrer	normal	9	1	15	Bewegung, Musik und Bühne	Erdkunde,Sport	Talentscouting\r\nWenn diese Karte eingestellt wird: Du kannst 1 Lehrkraft zahlen; aktiviere Sponsorenlauf direkt von deinem Deck. Einmal pro Spielzug, wenn ein anderer Bewegung-Lehrer einen Kampf gewinnt: Stelle 1 Bewegung-Lehrer mit 6 oder weniger Ansage von deiner Hand im offenen Chillmodus ein.	/cards/22.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:14:22.144+00
146	Frau Jütz	23	lehrer	normal	7	3	14	Bewegung	Sport	Motivation\r\nWenn diese Karte eingestellt wird: Lege 2 Rundenpunkte auf Sponsorenlauf. Einmal pro Spielzug: Du kannst 2 Rundenpunkte von Sponsorenlauf entfernen; stelle 1 Lehrer mit 5 oder weniger Ansage von deiner Hand im Ansagemodus ein.	/cards/23.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:14:55.307+00
148	Frau Mosbach	25	lehrer	normal	6	4	3	Bewegung	Biologie,Sport	Staffellauf\r\nWenn diese Karte durch Kampf in den Ruhestand geschickt wird: Stelle 1 Bewegung-Lehrer mit 5 oder weniger Ansage von deiner Hand im Ansagemodus ein und lege 1 Rundenpunkt auf Sponsorenlauf.	/cards/25.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:15:29.842+00
149	Herr Spira	26	lehrer	normal	5	5	2	Bewegung	Erdkunde,Mathe,Sport	Sporthelfer\r\nWenn diese Karte eingestellt wird: Lege 1 Rundenpunkt auf Sponsorenlauf. Wenn einer deiner Bewegung-Lehrer kämpft: Du kannst diese Karte von deiner Hand abwerfen; jene Karte kann in diesem Kampf nicht in den Ruhestand geschickt werden. Lege danach 1 Rundenpunkt auf Sponsorenlauf.	/cards/26.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:15:46.336+00
150	Herr Cleve	27	lehrer	normal	4	6	2	MINT	Astronomie,Mathe,Physik	Dachbeobachtung\r\nWenn du diese Karte einstellst: Du kannst 1 offenen MINT-Lehrer, den du kontrollierst, in den Chillmodus ändern. Falls du dies tust, ziehe 1 Karte. Solange diese Karte offen im Chillmodus liegt, erhalten deine anderen Astronomie-Lehrer +1 Chill.	/cards/27.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:16:07.898+00
152	Herr Winkhaus	29	lehrer	normal	6	4	25	MINT	Astronomie,Mathe,Physik	Sternwartenleitung\r\nWenn du diese Karte einstellst: Du kannst Sternwarte direkt von deinem Deck offen in deine Hintergrundreihe legen. Solange Sternwarte offen in deiner Hintergrundreihe liegt, erhält diese Karte +2 Ansage und kann nicht durch gegnerische Ereigniskarten in den Ruhestand geschickt werden. Einmal pro Zug: Du kannst 1 Karte von deiner Hand unter dein Deck legen; ziehe 1 Karte.	/cards/29.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:17:05.81+00
153	Herr Holbeck	30	lehrer	normal	6	4	2	MINT	Mathe,Geschichte	Subtraktion\r\nEinmal pro Spielzug, wenn dein Gegner den Effekt eines offenen Lehrers aktiviert: Du kannst 1 Karte von deiner Hand in den Ruhestand legen; annulliere den Effekt. Du kannst jeden Effekt von Herr Holbeck nur einmal pro Zug verwenden.	/cards/30.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:17:25.396+00
154	Herr Bukow	31	lehrer	normal	4	6	22	MINT	Biologie,Erdkunde	Schülerforschungszentrum\r\nWenn du diese Karte einstellst: Du kannst 1 MINT-Lehrer in deinem Ruhestand wählen; mische sie in dein Deck zurück. Falls du dies tust, ziehe 1 Karte. Solange diese Karte offen im Chillmodus liegt, können deine anderen MINT-Lehrer nicht durch gegnerische Ereigniskarten in den Ruhestand geschickt werden.	/cards/31.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:17:45.491+00
155	Frau Brill	32	lehrer	normal	8	2	20	Europa	Englisch,Spanisch	Madrid-Austausch\r\nFalls in diesem Zug einer deiner Europa-Lehrer auf deine Hand zurückgegeben wurde, kannst du diese Karte von deiner Hand im Ansagemodus einstellen. Wenn du diese Karte einstellst: Wähle 1 offenen Lehrer auf dem Feld mit 6 oder weniger Ansage; gib ihn auf die Hand zurück.	/cards/32.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:18:06.484+00
156	Herr Bigalke	33	lehrer	normal	6	4	20	Europa	Spanisch,Französisch	DELE\r\nWenn du diese Karte einstellst: Du kannst 1 anderen Europa-Lehrer, den du kontrollierst, auf die Hand zurückgeben. Falls du dies tust, stelle 1 Europa-Lehrer mit einem anderen Namen von deiner Hand im selben Modus ein. Einmal pro Spielzug, wenn einer deiner Europa-Lehrer durch einen deiner Effekte auf die Hand zurückgegeben wird: Wähle 1 offenen Lehrer deines Gegners mit weniger Dienstjahren als diese Karte; gib ihn auf die Hand zurück.	/cards/33.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:18:23.302+00
157	Frau Granger	34	lehrer	normal	3	7	5	Europa	EW,Englisch	Speaking Time\r\nWenn diese Karte eingestellt wird: Sieh dir die obersten 3 Karten deines Decks an. Du kannst 1 Europa- oder Englisch-Lehrer darunter auf die Hand nehmen. Lege den Rest unter dein Deck.	/cards/34.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:18:40.168+00
147	Frau Bielor	24	lehrer	normal	4	6	7	Bewegung	Biologie,Spanisch	Zumba\r\nWenn diese Karte eingestellt wird: Ändere den Modus von bis zu 2 offenen Lehrern. Einmal pro Spielzug, wenn ein Lehrer seinen Modus ändert: Wähle 1 Bewegung-Lehrer. Im Ansagemodus erhält er +2 Ansage bis zum Ende des Zuges. Im Chillmodus erhält er +2 Chill bis zum Ende des nächsten gegnerischen Zuges.	/cards/24.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:41:23.892+00
172	Frau Piechota	49	lehrer	normal	3	7	4	Digitalisierung	Deutsch,SoWi	Digitale Mündigkeit\r\nEinmal pro Spielzug, wenn dein Gegner eine Ereigniskarte aktiviert oder eine Karte verdeckt setzt: Du kannst diese Karte von deiner Hand abwerfen oder, falls sie offen auf deinem Feld liegt, sie in den Chillmodus ändern; annulliere die Wirkung der Karte und schicke sie in den Ruhestand.	/cards/49.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:23:34.844+00
158	Frau Klinkhammer	35	lehrer	normal	5	5	12	Europa	Englisch,Französisch	Austauschmappe\r\nWenn diese Karte eingestellt wird: Du kannst 1 Europa- oder 1 Lehrer mit Fremdsprache von deinem Deck auf die Hand nehmen. Einmal pro Spielzug, wenn du einen Europa-Lehrer einstellst: Du erhältst +2 Lehrkraft.	/cards/35.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:18:54.652+00
159	Frau Zarnikow	36	lehrer	normal	6	4	24	Europa	Englisch,Musik,Spanisch	Sprachwechsel\r\nWenn diese Karte eingestellt wird: Du kannst 1 Spanisch- oder Europa-Lehrer von deiner Hand im offenen Chillmodus einstellen. Einmal pro Spielzug, wenn einer deiner Europa-Lehrer eingestellt wird: Du erhältst +1 Lehrkraft.	/cards/36.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:19:12.602+00
160	Frau Morin	37	lehrer	normal	6	4	17	Europa	Deutsch,Französisch	Austauschprogramm\r\nWenn diese Karte eingestellt wird: Du kannst 1 Europa-Lehrer oder 1 Lehrer mit Fremdsprache von deinem Deck auf die Hand nehmen. Einmal pro Spielzug, wenn einer deiner Europa-Lehrer auf die Hand zurückgegeben wird: Du erhältst +2 Lehrkraft.	/cards/37.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:19:31.805+00
161	Frau Jülicher-Böker	38	lehrer	normal	6	4	26	Europa	Englisch,Französisch	Europa-Schulen\r\nEinmal pro Spielzug, wenn einer deiner Europa-Lehrer Ziel eines Angriffs oder Effekts wird: Du kannst ihn auf die Hand zurückgeben. Falls du dies tust, stelle 1 anderen Europa-Lehrer mit einem anderen Namen von deiner Hand im offenen Chillmodus ein. Falls die Summe der Dienstjahre deiner offenen Europa-Lehrer 30 oder mehr beträgt, kannst du die neue Karte stattdessen im Ansagemodus einstellen.	/cards/38.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:19:46.963+00
162	Frau Hinz	39	lehrer	normal	6	4	18	Europa	Englisch,Geschichte	Bilingualer Unterricht\r\nWenn diese Karte durch den Effekt eines Europa-Lehrers eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte ab. Einmal pro Zug: Wähle 1 Europa-Lehrer, den du kontrollierst. Liegt er im Ansagemodus, erhält er bis zum Ende des Zuges +2 Ansage. Liegt er im Chillmodus, erhält er bis zum Ende des nächsten gegnerischen Zuges +2 Chill.	/cards/39.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:20:03.073+00
163	Frau Aksu	40	lehrer	normal	4	6	9	Europa	Englisch,Geschichte	Geschichte bilingual\r\nWenn diese Karte eingestellt wird: Wähle 1 offenen Lehrer auf dem Feld; seine Ansage und Chill werden bis zum Ende des Zuges vertauscht. Einmal pro Spielzug: Wenn eine deiner Karten auf die Hand zurückkehrt, kannst du 1 Karte ziehen und dann 1 Karte ablegen.	/cards/40.png	t	2026-04-18 20:24:23.268486+00	2026-04-18 21:20:20.347+00
164	Herr Goecke	41	lehrer	normal	7	3	19	Europa	Englisch,Erdkunde	Hongkong-Austausch\r\nFalls in diesem Zug einer deiner Europa-Lehrer durch einen Effekt auf die Hand zurückgegeben wurde, kannst du diese Karte von deiner Hand im Ansagemodus einstellen. Wenn du diese Karte einstellst: Wähle 1 offenen Lehrer auf dem Feld mit 6 oder weniger Ansage; gib ihn auf die Hand zurück. Wenn diese Karte durch den Effekt eines Europa-Lehrer auf die Hand zurückgegeben wird: Du kannst 1 Europa-Lehrer mit einem anderen Namen von deiner Hand im Chillmodus einstellen.	/cards/41.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:20:38.298+00
165	Frau Roberts	42	lehrer	normal	6	4	15	Europa	Englisch,Geschichte	Erasmus+\r\nWenn du diese Karte einstellst: Nimm 1 Europa-Lehrer mit einem anderen Namen von deinem Deck auf die Hand.	/cards/42.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:20:52.92+00
166	Frau Hübner	43	lehrer	normal	8	2	16	Europa	Deutsch,SoWi,Französisch	DELF\r\nWenn du diese Karte einstellst: Wähle 1 Europa-Lehrer, den du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges erhält er +2 Ansage und kann nicht Ziel gegnerischer Ereigniskarten werden. Wenn diese Karte durch den Effekt eines Europa-Lehrers auf die Hand zurückgegeben wird: Du kannst 1 Karte ziehen und dann 1 Karte ablegen.	/cards/43.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:21:13.448+00
167	Frau Arnold	44	lehrer	normal	6	4	15	Beratung	Philo,Deutsch	Coaching\r\nWenn diese Karte eingestellt wird: Wähle 1 anderen Lehrer, den du kontrollierst. Er erhält bis zum Ende des nächsten gegnerischen Zuges +1 Ansage und +1 Chill. Wenn eine deiner offenen Lehrer Ziel eines Angriffs oder Effekts wird: Du kannst diese Karte von deiner Hand abwerfen; gib jenen Lehrer auf die Hand zurück und ziehe 1 Karte.	/cards/44.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:21:34.324+00
168	Frau Plätzer	45	lehrer	normal	7	3	9	Beratung	Deutsch,Religion	Schulseelsorge\r\nWenn du diese Karte einstellst: Du erhältst +2 Lehrkraft. Wenn dein Gegner dir durch Kampf oder einen Karteneffekt Lehrkraft abziehen würde: Du kannst diese Karte von deiner Hand abwerfen; ändere 1 offenen Lehrer auf dem Feld in den Chillmodus. Reduziere dann diesen Schaden auf 0.	/cards/45.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:21:46.321+00
170	Herr Zuber	47	lehrer	normal	5	5	14	Mittelstufe, Beratung, Digitalisierung	SoWi,Sport	Digitale Blume\r\nWenn diese Karte eingestellt wird: Wähle bis zu 2 andere offene Lehrer mit unterschiedlichen Fachsymbolen, die du kontrollierst. Eine erhält +2 Ansage, die andere +2 Chill bis zum Ende des nächsten gegnerischen Zuges. Wenn dein Gegner den Effekt eines offenen Lehrers aktiviert: Du kannst diese Karte von deiner Hand abwerfen; falls du 4 verschiedene Fachsymbole unter deinen offenen Lehrern kontrollierst, annulliere den Effekt.	/cards/47.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:22:55.454+00
171	Herr Sellin	48	lehrer	normal	6	4	12	Digitalisierung	Info,Mathe,Geschichte	Digitalisierungsbeauftragung\r\nWenn du diese Karte einstellst: Du kannst 1 Karte abwerfen; nimm 1 Digitalisierung-Lehrer von deinem Deck auf die Hand. Einmal pro Spielzug, wenn dein Gegner einen Angriff erklärt oder den Effekt eines offenen Lehrers aktiviert: Wähle 1 offenen Lehrer, den du kontrollierst. Falls er mehr Dienstjahre hat als die gegnerische Karte, wird die Ansage der gegnerischen Karte bis zum Ende des Zuges halbiert. Runde auf.	/cards/48.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:23:14.323+00
173	Herr Daniels	50	lehrer	normal	5	5	25	Digitalisierung	Info,Mathe,Physik	Digitalisierungskonzept\r\nWenn du diese Karte einstellst: Nimm 1 Digitalisierung-Lehrer oder WLAN-Ausfall von deinem Deck auf die Hand. Lege danach 1 Karte von deiner Hand unter dein Deck. Einmal pro beliebigem Spielzug, wenn eine Ereigniskarte aktiviert wird: Du kannst 1 Karte abwerfen; wähle 1 offene Lehrerkarte auf dem Feld. Ändere ihren Modus oder annulliere ihre Effekte bis zum Ende des Zuges.	/cards/50.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:23:53.196+00
169	Herr Urban	46	lehrer	normal	5	5	10	Digitalisierung, Jugend debattiert	Philo,Info,Deutsch,EW	KI-Übernahme\r\nWenn dein Gegner den Effekt eines offenen Lehrers aktiviert oder einen Angriff erklärt: Du kannst diese Karte von deiner Hand abwerfen; annulliere ihren Effekt und übernimm den Lehrer bis zum Ende desselben Zuges im Chillmodus. Gib ihn danach ihrem Besitzer im Chillmodus zurück.	/cards/46.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:22:27.183+00
201	Frau Brüning	78	lehrer	normal	7	3	7	Europa	EW,Spanisch	Babysitter-AG\r\nWenn diese Karte eingestellt wird: Nimm 1 Lehrer mit 5 oder weniger Ansage aus deinem Ruhestand auf die Hand. Einmal pro Spielzug: Wenn einer deiner Lehrer mit 5 oder weniger Ansage Ziel eines Angriffs wird, kannst du 1 Karte abwerfen; ändere jenen Lehrer in den Chillmodus.	/cards/78.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:33:18.339+00
174	Herr Pick	51	lehrer	normal	6	4	19	Digitalisierung	Info,Deutsch,Biologie	Homepage\r\nWenn du diese Karte einstellst: Decke 1 verdeckte Karte auf dem Feld auf. Falls es eine Falle ist, kann sie in diesem Zug nicht aktiviert werden. Einmal pro beliebigem Spielzug, wenn eine Karte auf dem Feld aufgedeckt wird: Du kannst 1 Karte ziehen und dann 1 Karte abwerfen.	/cards/51.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:24:20.08+00
175	Herr Wefes	52	lehrer	normal	5	5	14	Digitalisierung	Englisch,SoWi	Wissensorganisation\r\nWenn du diese Karte einstellst: Schaue dir die obersten 3 Karten deines Decks an. Ordne sie in beliebiger Reihenfolge. Du kannst anschließend 1 davon auf die Hand nehmen, falls es ein Lehrer mit 10 oder weniger Dienstjahren ist, und legst 1 Karte von deiner Hand unter dein Deck. Einmal pro Spielzug, wenn dein Gegner den Effekt eines offenen Lehrers mit weniger Dienstjahren als diese Karte aktiviert: Du kannst jene Karte in den Chillmodus ändern.	/cards/52.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:24:35.585+00
176	Herr Schreiber	53	lehrer	normal	6	4	3	BNE	Englisch,SoWi,Sport	Klimaparlament\r\nWenn diese Karte eingestellt wird: Mische 1 Lehrer aus deinem Ruhestand in dein Deck; ziehe 1 Karte. Einmal pro Spielzug, wenn eine deiner Karten aus dem Ruhestand zurückkehrt: Wähle 1 offenen Lehrer auf dem Feld; er erhält bis zum Ende des Zuges -2 Ansage.	/cards/53.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:24:54.279+00
209	Herr Gebauer	86	lehrer	normal	6	4	14	\N	Deutsch,Religion,Geschichte	Gamification\r\nZu Beginn deiner Pause: Nenne deinem Gegner 1 Ziel für diesen Zug:\r\n1) Stelle 1 Lehrerkarte ein. 2) Aktiviere 1 Ereignis- oder Fallenkarte. 3) Schicke 1 gegnerischen Lehrer durch Kampf in den Ruhestand. Wenn du dein gewähltes Ziel in diesem Zug erfüllst, wähle direkt danach 1 Belohnung: 1) Ziehe 1 Karte. 2) Stelle 1 zusätzliche Lehrerkarte mit 4 oder weniger Ansage im Chillmodus ein. 3) 1 offenen Lehrer, den du kontrollierst, darf in diesem Zug einen zusätzlichen Angriff durchführen.	/cards/86.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:35:25.795+00
177	Frau Schaller-Picard	54	lehrer	normal	3	7	21	BNE	Biologie,Musik,Religion	Klimaparlament\r\nWenn diese Karte in den Ruhestand geschickt wird: Du kannst sie einmal pro Spiel im Chillmodus wieder einstellen. Einmal pro Spielzug, wenn eine deiner Karten aus dem Ruhestand auf deine Hand oder auf dein Feld zurückkehrt: Du erhältst +2 Lehrkraft.	/cards/54.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:25:10.654+00
178	Frau Efthymiadou	55	lehrer	normal	7	3	17	BNE	Biologie,Englisch	Nachhaltige Wende\r\nWenn diese Karte eingestellt wird: Nimm 1 BNE-Lehrer aus deinem Ruhestand auf die Hand. Einmal pro Spielzug: Wenn eine deiner Karten aus dem Ruhestand zurückkehrt, wähle 1 offenen Lehrer. Falls diese Karte mehr Dienstjahre hat, ändere sie in den Chillmodus. Andernfalls erhält sie -2 Ansage.	/cards/55.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:25:29.619+00
179	Frau Voßkühler	56	lehrer	normal	6	4	15	BetHa	Kunst	StreetArt\r\nSolange du Herr Roth kontrollierst, können deine BetHa-Lehrer kein Ziel gegnerischer Ereignis- und Fallenkarten werden. Falls du einen anderen Lehrer mit dem Fach Kunst kontrollierst, erhältst du am Ende deines Zuges +1 Lehrkraft.	/cards/56.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:25:44.664+00
180	Herr Roth	57	lehrer	normal	6	4	13	BetHa	Deutsch,SoWi	Bis zum Schluss\r\nWenn diese Karte eingestellt wird: Gib 1 offenen Lehrer mit 6 oder weniger Ansage auf die Hand zurück. Solange diese Karte offen liegt, kannst du einmal pro Spielzug, wenn dein Gegner den Effekt eines offenen Lehrers aktiviert und du 3 oder mehr Handkarten hast, 1 Karte abwerfen; ändere jene Karte in den Chillmodus.	/cards/57.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:25:57.574+00
181	Herr Kruskic	58	lehrer	normal	4	6	6	Musik und Bühne	Chemie,Englisch	Pyrotechnik\r\nWenn diese Karte eingestellt wird: Schicke 1 verdeckte Karte deines Gegners in den Ruhestand. Falls es eine Falle war, verliert dein Gegner 2 Lehrkraft. Wenn dein Gegner eine Ereigniskarte aktiviert oder eine Karte verdeckt setzt: Du kannst diese Karte von deiner Hand abwerfen; 1 offener Lehrer erhält bis zum Ende des Zuges -3 Ansage.	/cards/58.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:26:17.188+00
182	Frau Ditgens	59	lehrer	normal	3	7	11	Musik und Bühne	Musik	Einschulungsmusik\r\nWenn diese Karte eingestellt wird: Du erhältst +2 Lehrkraft. Einmal pro Spielzug, wenn einer deiner Lehrer Ziel eines Angriffs wird: Du kannst diese Karte von deiner Hand abwerfen; ändere deinen Lehrer in den Chillmodus.	/cards/59.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:26:39.126+00
183	Herr Gessner	60	lehrer	normal	2	8	5	Musik und Bühne	Musik	Orchesterprobe\r\nSolange diese Karte offen im Chillmodus liegt: Alle Musik-und-Bühne-Lehrer, die du kontrollierst, erhalten +1 Ansage. Einmal pro Zug, wenn dein Gegner einen Angriff erklärt: Du kannst diese Karte von deiner Hand abwerfen; der Angriff wird annulliert.	/cards/60.png	t	2026-04-18 20:24:23.283338+00	2026-04-18 21:26:57.143+00
184	Frau Brockmann	61	lehrer	normal	5	5	3	Musik und Bühne	Musik	Musical\r\nWenn diese Karte eingestellt wird: Wähle bis zu 2 offene Lehrer, die du kontrollierst. Sie erhalten bis zum Ende des nächsten gegnerischen Zuges +1 Ansage und +1 Chill. Wenn einer deiner Lehrer seinen Modus ändert: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.	/cards/61.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:27:12.042+00
185	Herr Spill-Hartung	62	lehrer	normal	5	5	8	Musik und Bühne	Deutsch,Musik	Rhythmusgefühl\r\nWenn diese Karte eingestellt wird: Ändere den Modus von bis zu 2 deiner Lehrer. Einmal pro Spielzug, wenn einer deiner Lehrer ihren Modus ändert: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.	/cards/62.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:27:29.417+00
195	Frau Windgasse	72	lehrer	normal	7	3	25	Ausbildung	EW,Englisch	Unterrichtsbesuch\r\nWenn diese Karte eingestellt wird: Du kannst 1 Lehrer mit 5 oder weniger Ansage von deiner Hand im Chillmodus einstellen. Einmal pro Spielzug: Wenn ein anderer Lehrer, den du kontrollierst und der weniger Dienstjahre als diese Karte hat, in den Ruhestand gehen würde, gib sie stattdessen auf die Hand zurück.	/cards/72.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:31:25.607+00
197	Frau Sonntag	74	lehrer	normal	7	3	17	Ausbildung	Deutsch,Englisch,Religion	Orientierung\r\nFalls dein Gegner mehr Lehrer kontrolliert als du, darfst du in deinem Unterricht 1 zusätzliche Lehrerkarte im Chillmodus einstellen. Einmal pro Zug, wenn du einen Lehrer im Chillmodus einstellst: Du kannst 1 anderen offenen Lehrer, den du kontrollierst, in den Chillmodus drehen.	/cards/74.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:32:00.322+00
186	Frau Jung	63	lehrer	normal	5	5	15	Musik und Bühne	Englisch,Latein,Musik,Spanisch	Pop\r\nWenn diese Karte eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte ab. Falls die abgelegte Karte ein Lehrer war, erhält 1 offener Lehrer, den du kontrollierst, bis zum Ende des Zuges +2 Ansage.	/cards/63.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:27:48.773+00
187	Frau Bischop	64	lehrer	normal	7	3	2	Musik und Bühne	Englisch,Erdkunde	Irish Dance\r\nWenn diese Karte eingestellt wird: Ändere den Modus von 1 offenen Lehrer. Einmal pro Spielzug, wenn ein Lehrer seinen Modus ändert: Diese Karte erhält bis zum Ende des Zuges +2 Ansage. Falls sie dadurch 9 oder mehr Ansage hat, kann sie beim Angriff auf einen Lehrer im Chillmodus direkt Schaden in Höhe der Differenz zufügen.	/cards/64.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:28:06.776+00
188	Herr Beichl	65	lehrer	normal	4	6	7	Vielfalt	Englisch,SoWi	Vielfalts-AG\r\nWenn diese Karte eingestellt wird: Du kannst Schule ohne Rassismus direkt von deinem Deck offen in deine Hintergrundreihe legen. Falls Schule ohne Rassismus offen liegt, erhalten offene gegnerische Lehrer mit 7 oder mehr Ansage -2 Ansage und +2 Chill. Wenn dein Gegner den Effekt eines offenen Lehrers mit 7 oder mehr Ansage aktiviert: Du kannst diese Karte von deiner Hand abwerfen; ändere jene Karte in den Chillmodus.	/cards/65.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:28:20.22+00
189	Frau Wissemann	66	lehrer	normal	4	6	5	Vielfalt, FerienWerk	Spanisch,Sport	Antidiskriminierungsarbeit\r\nWenn diese Karte eingestellt wird: Falls Schule ohne Rassismus offen in deiner Hintergrundreihe liegt, ziehe 1 Karte. Einmal pro Spielzug, wenn ein gegnerischer Lehrer durch einen deiner Effekte in den Chillmodus geändert wird: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.	/cards/66.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:28:45.516+00
190	Frau Tenter	67	lehrer	normal	6	4	9	Vielfalt, FerienWerk	Kunst,Sport	Safe Space\r\nWenn diese Karte eingestellt wird: Falls Schule ohne Rassismus offen in deiner Hintergrundreihe liegt, wähle 1 offenen gegnerischen Lehrer; ändere seinen Modus. Einmal pro Zug, wenn dein Gegner eine Ereignis- oder Fallenkarte aktiviert, die einen deiner Lehrer betrifft: Du kannst diese Karte von deiner Hand abwerfen; annulliere den Effekt.	/cards/67.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:29:12.282+00
191	Frau Bünger	68	lehrer	normal	4	6	6	FerienWerk, Bewegung	Biologie,Erdkunde,Sport	FerienWerk\r\nWenn diese Karte eingestellt wird und du Frau Tenter oder Frau Wissemann kontrollierst: Ziehe 2 Karten, dann lege 1 Karte ab. Einmal pro Zug: Wenn einer deiner Lehrer in den Ruhestand geschickt wird, kannst du 1 Karte vom Ruhestand deines Gegners aus dem Spiel entfernen.	/cards/68.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:29:36.271+00
192	Frau Jaite	69	lehrer	normal	6	4	9	Vielfalt, Europa	Deutsch,Latein	Gleichstellung\r\nWenn diese Karte in den Ruhestand geschickt wird, kannst du eine Karte mit identischen Ansage- und Chillwerten direkt von deinem Deck einstellen.	/cards/69.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:29:54.652+00
193	Frau Janura	70	lehrer	normal	4	6	7	Januras	Englisch,Religion	Ying\r\nWenn diese Karte eingestellt wird: Du kannst Herr Janura von deiner Hand oder aus deinem Ruhestand im Chillmodus einstellen. Solange du Herr Janura kontrollierst, erhalten beide +4 Ansage. Einmal pro Spielzug: Wenn eine deiner Janura-Karten Ziel eines Angriffs oder Effekts wird, kannst du 1 Karte abwerfen; gib eine Janura-Karte auf die Hand zurück.	/cards/70.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:30:52.237+00
194	Herr Janura	71	lehrer	normal	4	6	5	Januras	Philo,Info,Geschichte	Yang\r\nWenn diese Karte eingestellt wird: Du kannst Frau Janura von deiner Hand im Chillmodus einstellen. Einmal pro Zug: Falls du Frau Janura kontrollierst, wähle 1 offenen Lehrer; seine Ansage und Chill werden bis zum Ende des Zuges vertauscht. Wenn Frau Janura das Feld verlässt: Du kannst 1 Karte ziehen, dann 1 Karte ablegen.	/cards/71.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:31:11.205+00
196	Frau Orth	73	lehrer	normal	5	5	12	Ausbildung	Deutsch,Sport	Praxissemester\r\nWenn diese Karte eingestellt wird: Nimm 1 Lehrer mit 10 oder weniger Dienstjahren von deinem Deck auf die Hand. Einmal pro Spielzug: Wenn du einen Lehrer mit 5 oder weniger Ansage (außer Frau Orth) einstellst, darf jener Lehrer in diesem Zug zwei Mal angreifen.	/cards/73.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:31:39.297+00
198	Frau Heller	75	lehrer	normal	7	3	13	Lehrerrat	Englisch,SoWi	Tagesordnung\r\nWenn diese Karte eingestellt wird: Sieh dir die Hand deines Gegners an. Wähle 1 Ereignis- oder Fallenkarte daraus; bis zum Ende des nächsten gegnerischen Zuges kann dein Gegner keine Karte mit demselben Namen spielen oder setzen.	/cards/75.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:32:17.72+00
199	Frau Linnartz	76	lehrer	normal	5	5	25	Lehrerrat	Biologie,Englisch	Mehrheitsbeschluss\r\nZu Beginn deiner Pause: Wähle 1 Beschluss. Er gilt bis zum Ende des gegnerischen Zuges:\r\n1) Direkte Angriffe sind nicht erlaubt.\r\n2) Jeder Spieler kann nur mit 1 Lehrer angreifen.\r\n3) Lehrer mit 8 oder mehr Ansage können ihre Effekte nicht aktivieren.	/cards/76.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:32:42.645+00
200	Herr Bünger	77	lehrer	normal	3	7	16	Lehrerrat	SoWi,Sport	Beschlussvorlage\r\nWenn diese Karte eingestellt wird: Nimm 1 Ereignis- oder Fallenkarte aus deinem Ruhestand auf die Hand. Falls es eine dauerhafte Ereigniskarte war, kannst du sie stattdessen offen in deine Hintergrundreihe legen.	/cards/77.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:32:58.649+00
217	CertiLingua	94	ereignis	normal	\N	\N	\N	\N	\N	Wähle 1 Europa-Lehrer oder 1 Lehrer mit Fremdsprache, den du kontrollierst. Bis zum Ende des nächsten gegnerischen Zuges erhält er +3 Ansage und kann nicht Ziel gegnerischer Ereigniskarten werden. Falls dieser Lehrer in diesem Zug durch einen deiner Effekte auf die Hand zurückgegeben wird, ziehe 1 Karte.	/cards/94.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 20:24:23.400561+00
218	Schule ohne Rassismus	95	ereignis	normal	\N	\N	\N	\N	\N	Offene gegnerische Lehrer mit 6 oder mehr Ansage erhalten -2 Ansage und +1 Chill. Einmal pro Spielzug: Wenn dein Gegner den Effekt eines solchen Lehrers aktiviert, kannst du 1 Karte abwerfen; ändere ihn in den Chillmodus.	/cards/95.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 20:24:23.400561+00
203	Frau Wallerath	80	lehrer	normal	7	3	11	\N	Deutsch,Englisch	Korrektur\r\nWenn diese Karte eingestellt wird: Ziehe 1 Karte, dann lege 1 Karte von deiner Hand unter dein Deck. Einmal pro Spielzug, wenn Kampfwerte verglichen werden: Du kannst bei 1 beteiligten Lehrer Ansage und Chill bis zum Ende des Zuges vertauschen.	/cards/80.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:33:57.692+00
211	Frau Hoffmann	88	lehrer	normal	8	2	3	Jugend debattiert	Deutsch,Religion,Geschichte	Insta-Debatte\r\nWenn einer deiner Lehrer durch einen Karteneffekt auf deine Hand zurückgegeben wird: Du kannst diese Karte ohne Tribut von deiner Hand offen im Ansagemodus einstellen. Falls die zurückgegebene Karte ein Jugend-debattiert-Lehrer war, ziehe 1 Karte, dann wirf 1 Karte ab. Du kannst diesen Effekt nur einmal pro Zug verwenden.	/cards/88.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:35:55.569+00
213	Herr Schneider	90	lehrer	normal	7	3	29	Jugend debattiert	Deutsch,Mathe	Verschriftlichung\r\nWenn diese Karte eingestellt wird: Decke die obersten 3 Karten deines Decks auf. Du kannst 1 Jugend-debattiert-Lehrer darunter auf die Hand nehmen. Lege den Rest in beliebiger Reihenfolge unter dein Deck. Falls du Herrn Kamphoff kontrollierst, kannst du stattdessen 1 Jugend debattiert-Lehrer darunter direkt im offenen Chillmodus einstellen. Du kannst diesen Effekt nur einmal pro Zug verwenden.	/cards/90.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:36:27.077+00
214	Frau Hinkers	91	lehrer	normal	3	7	3	Jugend debattiert	Deutsch,Religion	Zwischenfrage\r\nWenn 1 anderer Jugend-debattiert-Lehrer, den du kontrollierst, als Angriffsziel gewählt wird: Du kannst das Angriffsziel auf diese Karte ändern. Wird diese Karte dadurch vom Chillmodus aufgedeckt, annulliere den Angriff. Danach kannst du 1 offenen Jugend-debattiert-Lehrer, den du kontrollierst, in den verdeckten Chillmodus drehen. Du kannst diesen Effekt von Frau Hinkers nur einmal pro Zug verwenden.	/cards/91.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:37:06.297+00
202	Frau Harms	79	lehrer	normal	8	2	22	\N	Deutsch,EW	Erziehung\r\nWenn diese Karte eingestellt wird: Wähle 1 offenen gegnerischen Lehrer; er kann im nächsten gegnerischen Zug nicht angreifen und seine Effekte nicht aktivieren. Nimm außerdem einen Lehrer mit dem Fach Erziehungswissenschaft vom Deck auf deine Hand auf.	/cards/79.png	t	2026-04-18 20:24:23.302266+00	2026-04-18 21:33:44.249+00
204	Frau Wirtz	81	lehrer	normal	4	6	11	\N	Deutsch,Kunst	Bibliotheksrecherche\r\nWenn diese Karte eingestellt wird: Mische bis zu 2 Karten aus deinem Ruhestand in dein Deck. Einmal pro Zug: Du kannst 1 Karte aus deinem Ruhestand unter dein Deck legen; ziehe 1 Karte, dann wirf 1 Karte ab.	/cards/81.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:34:13.533+00
205	Frau Ilaender	82	lehrer	normal	4	6	4	Europa	Deutsch,SoWi	Ergänzung\r\nWenn diese Karte eingestellt wird: Du darfst in diesem Zug 1 zusätzlichen Lehrer mit 4 oder weniger Ansage einstellen. Einmal pro Spielzug, wenn einer deiner Lehrer auf deine Hand zurückgegeben wird: Du kannst diese Karte in den Chillmodus ändern.	/cards/82.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:34:27.882+00
206	Frau Ruhmann	83	lehrer	normal	6	4	8	\N	Religion,Französisch	Erste Hilfe\r\nWenn einer deiner Lehrer durch Kampf in den Ruhestand gehen würde: Du kannst diese Karte von deiner Hand abwerfen; ändere jenen Lehrer stattdessen in den Chillmodus. Wenn diese Karte eingestellt wird: Du erhältst +2 Lehrkraft.	/cards/83.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:34:42.885+00
207	Frau Vianden	84	lehrer	normal	7	3	3	\N	Kunst,Englisch	Renaissance\r\nWenn diese Karte eingestellt wird: Wähle 1 offenen Lehrer auf dem Feld; diese erhält bis zum Ende des Zuges die Ansage und den Chill-Wert eines anderen offenen Lehrers auf dem Feld. Du kannst diesen Effekt nur einmal pro Zug verwenden.	/cards/84.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:35:00.763+00
208	Herr Harms	85	lehrer	normal	5	5	17	\N	Englisch,Sport	Fachleitung\r\nWenn diese Karte eingestellt wird: Wähle 1 offenen Lehrer, den du kontrollierst; er erhält bis zum Ende des Zuges +2 Ansage. Einmal pro Spielzug, wenn du einen Englisch-Lehrer einstellst: Ziehe 1 Karte.	/cards/85.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:35:12.361+00
210	Frau Neumann	87	lehrer	normal	7	3	9	\N	Erdkunde,Mathe	Koordinaten\r\nWenn diese Karte eingestellt wird: Sieh dir die obersten 3 Karten eines Decks an und lege sie in beliebiger Reihenfolge zurück. Einmal pro Spielzug: Du kannst die oberste Karte deines Decks aufdecken; ist es ein Lehrer, erhältst du +1 Lehrkraft. Andernfalls lege sie unter dein Deck.	/cards/87.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:35:38.051+00
212	Frau Gottschalk	89	lehrer	normal	3	7	5	Jugend debattiert	Philo,Englisch	Schlussplädoyer\r\nAm Ende deines Zuges, falls in diesem Zug 1 oder mehr deiner Jugend-debattiert-Lehrer vom Chillmodus aufgedeckt oder durch einen Karteneffekt auf deine Hand zurückgegeben wurden: Wähle 1 Effekt: 1. Dein Gegner legt die obersten 2 Karten seines Decks in den Ruhestand. 2. Drehe 1 offenen Jugend-debattiert-Lehrer, den du kontrollierst, in den verdeckten Chillmodus. Du kannst den Effekt nur einmal pro Zug verwenden.	/cards/89.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:36:11.969+00
215	Herr Kamphoff	92	lehrer	normal	0	10	7	Jugend debattiert	Philo,Deutsch,Religion,Geschichte	Konter\r\nWenn diese Karte aufgedeckt wird: Gib den angreifenden Lehrer auf die Hand zurück. Sein Besitzer legt die obersten 2 Karten seines Decks in den Ruhestand. Einmal pro Zug: Du kannst 1 anderen Lehrer, den du kontrollierst, auf die Hand zurückgeben; ändere diese Karte in den verdeckten Chillmodus.	/cards/92.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:37:34.49+00
216	Elternsprechtag	93	ereignis	normal	\N	\N	\N	\N	\N	Solange der Elternsprechtag läuft, sind die Werte von Ansage und Chill vertauscht.	/cards/93.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 21:37:48.529+00
219	Ausbildung am CFG	96	ereignis	normal	\N	\N	\N	\N	\N	Stelle 1 Lehrer mit 5 oder weniger Ansage von deiner Hand im verdeckten Chillmodus ein. Falls du ihn zu Beginn deines nächsten Zuges in den Ansage-Modus änderst, ziehe 1 Karte.	/cards/96.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 20:24:23.400561+00
220	Abiturklausurplan	97	ereignis	normal	\N	\N	\N	\N	\N	Solange diese Karte offen in deiner Hintergrundreihe liegt, erhalten deine Oberstufe-Lehrer +2 Ansage. Einmal pro Zug: Falls die Summe der Dienstjahre deiner offenen Oberstufe-Lehrer 45 oder mehr beträgt, kannst du 1 Karte ziehen und dann 1 Karte ablegen.	/cards/97.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 20:24:23.400561+00
221	Sponsorenlauf	98	ereignis	normal	\N	\N	\N	\N	\N	Wenn diese Karte aktiviert wird: Lege 2 Rundenpunkte auf diese Karte. Immer wenn einer deiner Bewegung-Lehrer einen Kampf gewinnt oder direkt Schaden zufügt: Lege 1 Rundenpunkt auf diese Karte. Einmal pro Zug: Du kannst 4 Rundenpunkte von dieser Karte entfernen; wähle: 1) 1 Bewegung-Lehrer, den du kontrollierst, erhält bis zum Ende des Zuges +3 Ansage und kann in diesem Zug einmal zusätzlich angreifen. 2) Du erhältst +5 Lehrkraft.	/cards/98.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 20:24:23.400561+00
222	Kursumwahl	99	ereignis	normal	\N	\N	\N	\N	\N	Wähle 1 Oberstufe-Lehrer von deiner Hand und 1 Oberstufe-Lehrer aus deinem Ruhestand. Tausche die beiden Karten miteinander. Falls du einen offenen Lehrer mit 20 oder mehr Dienstjahren kontrollierst, kannst du anschließend 1 Karte ziehen und dann 1 Karte ablegen.	/cards/99.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 20:24:23.400561+00
223	Ordnungsmaßnahme	100	ereignis	normal	\N	\N	\N	\N	\N	Wähle 1 offenen Lehrer im Ansagemodus auf dem Feld und schicke ihn in den Ruhestand.	/cards/100.png	t	2026-04-18 20:24:23.400561+00	2026-04-18 20:24:23.400561+00
224	Vertretungsplan	101	ereignis	normal	\N	\N	\N	\N	\N	Wähle 1 Lehrer in deinem Ruhestand. Stelle ihn im Chillmodus ein, aber seine Effekte sind für diesen Zug annulliert.	/cards/101.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
225	Sternwarte	102	ereignis	normal	\N	\N	\N	\N	\N	Solange diese Karte offen in deiner Hintergrundreihe liegt, erhalten deine Astronomie-Lehrer +2 Ansage und +2 Chill. Einmal pro Zug: Falls du einen Astronomie-Lehrer kontrollierst, kannst du 1 Karte von deiner Hand unter dein Deck legen; ziehe 1 Karte.	/cards/102.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
226	Mensa-Team	103	ereignis	normal	\N	\N	\N	\N	\N	Du bekommst Unterstützung vom Mensa-Team und in jedem deiner Züge, jetzt beginnend, +2 Lehrkraft.	/cards/103.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
227	Debattenprüfung	104	ereignis	normal	\N	\N	\N	\N	\N	Wenn diese Karte aktiviert wird: Du kannst 1 Jugend-debattiert-Lehrer von deinem Deck auf die Hand nehmen. Einmal pro Spielzug, wenn 1 deiner Jugend-debattiert-Lehrer durch einen Effekt auf die Hand zurückgegeben wird: Du kannst 1 Karte ziehen.	/cards/104.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
228	Frau Kappe	105	ereignis	normal	\N	\N	\N	\N	\N	Nimm 1 Fallenkarte oder 1 Ereigniskarte von deinem Deck auf die Hand.	/cards/105.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
229	Frau Lettmann	106	ereignis	normal	\N	\N	\N	\N	\N	Nimm 1 Lehrer mit 6 oder weniger Ansage von deinem Deck auf die Hand.	/cards/106.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
230	Hausmeister-Team	107	ereignis	normal	\N	\N	\N	\N	\N	Wähle 1 Karte in einer Hintergrundreihe und zerstöre sie.	/cards/107.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
231	Zeugniskonferenz	108	ereignis	normal	\N	\N	\N	\N	\N	Ziehe 2 Karten, dann lege 1 Karte in den Ruhestand. Falls du keinen Lehrer auf dem Feld kontrollierst, ziehe stattdessen 3 Karten und lege 1 Karte in den Ruhestand.	/cards/108.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
232	Kollegiumsausflug	109	ereignis	normal	\N	\N	\N	\N	\N	Schicke alle offenen Lehrer im Ansagemodus in den Ruhestand. Kein Spieler kann in diesem Zug angreifen.	/cards/109.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
233	Antrag abgelehnt	110	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner den Effekt eines Lehrers aktiviert, der in diesem Zug eingestellt wurde, oder mit ihm angreift: Annulliere den Effekt oder Angriff und ändere jene Karte in den Chillmodus.	/cards/110.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
234	Lehrerratsprotokoll	111	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner in demselben Zug einen zweiten Lehrer einstellt oder einen zweiten Angriff erklärt: Annulliere diese Aktion.	/cards/111.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
235	LGBTQIA+	112	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner einen Angriff erklärt oder den Effekt eines offenen Lehrers mit 7 oder mehr Ansage aktiviert: Jene Karte erhält -3 Ansage und +1 Chill. Ändere sie außerdem in den Chillmodus.	/cards/112.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
236	Unterrichtsstörung	113	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner einen Angriff erklärt: Wähle 1 offenen Lehrer auf dem Feld; seine Ansage wird bis zum Ende des Zuges halbiert. Runde auf.	/cards/113.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
237	WLAN-Ausfall	114	falle	normal	\N	\N	\N	\N	\N	Aktiviere diese Karte nur, wenn dein Gegner mehr offene Lehrer kontrolliert als du. Ändere alle offenen Lehrer auf dem Feld in den Chillmodus. Bis zum Beginn deines nächsten Zuges kann kein Spieler Ereigniskarten aktivieren oder den Modus eines Lehrers ändern.	/cards/114.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
238	Lehrermangel	115	falle	normal	\N	\N	\N	\N	\N	Wenn einer deiner Lehrer durch Kampf in den Ruhestand geschickt würde: Gib ihn stattdessen auf die Hand zurück.	/cards/115.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
239	Mündliche Nachprüfung	116	falle	normal	\N	\N	\N	\N	\N	Wenn einer deiner Lehrer durch Kampf in den Ruhestand geschickt würde: Er wird nicht in den Ruhestand geschickt. Ändere stattdessen seinen Modus in den Chillmodus. Seine Effekte sind bis zum Ende des Zuges annulliert.	/cards/116.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
240	Überraschungstest	117	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner einen Lehrer einstellt: Annulliere seinen Effekt bis zum Ende dieses Zuges.	/cards/117.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
241	Nachsitzen	118	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner einen Lehrer einstellt: Alle gegnerischen Lehrer wechseln in den Chillmodus und bleiben darin, bis du 2 offene Lehrer kontrollierst. Lege diese Karte dann in den Ruhestand.	/cards/118.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
242	Pensionszwang	119	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner eine Karte aus seinem Ruhestand auf die Hand nimmt oder einstellt: Annulliere den Effekt. Entferne bis zu 3 Karten im Ruhestand deines Gegners aus dem Spiel.	/cards/119.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
243	Feueralarm	120	falle	normal	\N	\N	\N	\N	\N	Wenn dein Gegner mit einem Lehrer 7+ Ansage angreift: Gib den angreifenden Lehrer und 1 anderen offenen Lehrer deines Gegners auf die Hand zurück.	/cards/120.png	t	2026-04-18 20:24:23.418521+00	2026-04-18 20:24:23.418521+00
\.


--
-- Data for Name: downloads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.downloads (id, name, description, file_url, file_type, file_size, published, created_at) FROM stdin;
1	Regelwerk	Die vollständigen Spielregeln zum Nachlesen und Ausdrucken.	/docs/regelwerk.pdf	pdf	\N	t	2026-04-16 20:54:42.077434+00
\.


--
-- Data for Name: limited_cards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.limited_cards (id, name, max_copies, reason, created_at, updated_at) FROM stdin;
1	Mertens	1	\N	2026-04-16 20:54:41.915802+00	2026-04-16 20:54:41.915802+00
2	Drübert	1	\N	2026-04-16 20:54:41.915802+00	2026-04-16 20:54:41.915802+00
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news (id, title, content, published, created_at, updated_at) FROM stdin;
1	CFG Legends ist da!	Erster Verkauf nach dem Lehrerkonzert am Donnerstag, danach in den Pausen für 2 € 7 Karten.	t	2026-04-16 20:54:41.975444+00	2026-04-21 09:05:20.045+00
\.


--
-- Name: admin_audit_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_audit_logs_id_seq', 21, true);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 2, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cards_id_seq', 244, true);


--
-- Name: downloads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.downloads_id_seq', 1, true);


--
-- Name: limited_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.limited_cards_id_seq', 5, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.news_id_seq', 2, true);


--
-- Name: admin_audit_logs admin_audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_audit_logs
    ADD CONSTRAINT admin_audit_logs_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: cards cards_card_number_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_card_number_unique UNIQUE (card_number);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: downloads downloads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.downloads
    ADD CONSTRAINT downloads_pkey PRIMARY KEY (id);


--
-- Name: limited_cards limited_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.limited_cards
    ADD CONSTRAINT limited_cards_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: admin_users_email_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX admin_users_email_unique ON public.admin_users USING btree (email);


--
-- Name: admin_audit_logs admin_audit_logs_admin_user_id_admin_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_audit_logs
    ADD CONSTRAINT admin_audit_logs_admin_user_id_admin_users_id_fk FOREIGN KEY (admin_user_id) REFERENCES public.admin_users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 3s7QABfR7YUViXcsRfFAffnZUsJx1ppPzZJFYHm4gT3hacDhoHnnat2RTiEjZCY

