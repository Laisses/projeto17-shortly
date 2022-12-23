--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer NOT NULL,
    original_url text NOT NULL,
    short_url text NOT NULL,
    view_count integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '0cf4c553-bb25-43bf-835d-2150231b75df');
INSERT INTO public.sessions VALUES (2, 2, 'fc3397f8-05ce-4026-be87-7ca560615e6c');
INSERT INTO public.sessions VALUES (3, 3, '4f8dd703-b512-4cbb-b0cc-ad603c636e97');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 2, 'https://www.postgresql.org/', '17ePeMW4h0LW4cwWV1KP7', 0, '2022-12-23 13:59:59.628727');
INSERT INTO public.urls VALUES (2, 2, 'https://www.google.com/', '00JL2cAdGbWAxfslJVTUZ', 0, '2022-12-23 14:00:25.079994');
INSERT INTO public.urls VALUES (3, 2, 'https://www.jspuzzles.com/indexpt.php', 'd3_0SrsaHeoS3O6azNJXF', 1, '2022-12-23 14:00:49.150901');
INSERT INTO public.urls VALUES (4, 3, 'https://www.google.com/', 'hbuvZkUpMWgq1R1I-YKrg', 0, '2022-12-23 14:02:40.638731');
INSERT INTO public.urls VALUES (5, 3, 'https://www.nonograms.org/', 'cE1RqQtUNnyePG7iWCLWu', 0, '2022-12-23 14:03:05.389647');
INSERT INTO public.urls VALUES (6, 3, 'https://www.youtube.com/watch?v=cRWDUxe3WVg', 'ygbRGsNnIzHCpVv75FTq6', 0, '2022-12-23 14:03:19.02011');
INSERT INTO public.urls VALUES (7, 3, 'https://www.driven.com.br/', 'kgtdJEt-TPViy4ZB4dMYA', 0, '2022-12-23 14:04:16.702942');
INSERT INTO public.urls VALUES (8, 3, 'https://zoom.us/', 'KXSQGVx3_sknXyGNc5DcZ', 0, '2022-12-23 14:04:44.936499');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Maria', 'maria@email.com', '$2b$10$ws2k2BENCRuC19F.Rv6IP.r5Rnr6yo/Gz/gkko74wQU152mQiEzh.', '2022-12-23 13:55:30.662214');
INSERT INTO public.users VALUES (2, 'Laisse', 'laisse@email.com', '$2b$10$DLmAU.MzmHeVNfcJ58KRt.qWsS4vItxxFsoG9Q/e7hOEpQUgFMWr6', '2022-12-23 13:58:31.106736');
INSERT INTO public.users VALUES (3, 'Anita', 'anita@email.com', '$2b$10$dQ4Bg8sqqdIXNOv5oo3hiuZ0R9fXsKXCz2887DrQzVL7cZt89KzG2', '2022-12-23 14:01:57.824182');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

