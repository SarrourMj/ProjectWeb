--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2025-02-01 16:48:24

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
-- TOC entry 215 (class 1259 OID 16486)
-- Name: chapter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chapter (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    content text NOT NULL,
    questions jsonb,
    score integer,
    "courseId" integer
);


ALTER TABLE public.chapter OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16485)
-- Name: chapter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chapter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chapter_id_seq OWNER TO postgres;

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 214
-- Name: chapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chapter_id_seq OWNED BY public.chapter.id;


--
-- TOC entry 217 (class 1259 OID 16495)
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    certificate character varying(100),
    category character varying(50) NOT NULL
);


ALTER TABLE public.course OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16494)
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_id_seq OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 216
-- Name: course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_id_seq OWNED BY public.course.id;


--
-- TOC entry 219 (class 1259 OID 16504)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    score integer NOT NULL,
    badges text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16513)
-- Name: user_courses_course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_courses_course (
    "userId" integer NOT NULL,
    "courseId" integer NOT NULL
);


ALTER TABLE public.user_courses_course OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16503)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3187 (class 2604 OID 16489)
-- Name: chapter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter ALTER COLUMN id SET DEFAULT nextval('public.chapter_id_seq'::regclass);


--
-- TOC entry 3188 (class 2604 OID 16498)
-- Name: course id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course ALTER COLUMN id SET DEFAULT nextval('public.course_id_seq'::regclass);


--
-- TOC entry 3189 (class 2604 OID 16507)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3349 (class 0 OID 16486)
-- Dependencies: 215
-- Data for Name: chapter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chapter (id, title, content, questions, score, "courseId") FROM stdin;
\.


--
-- TOC entry 3351 (class 0 OID 16495)
-- Dependencies: 217
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (id, title, certificate, category) FROM stdin;
\.


--
-- TOC entry 3353 (class 0 OID 16504)
-- Dependencies: 219
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, email, password, score, badges) FROM stdin;
1	john_doe	john.doe@example.com	securepassword	0	
2	sam_s	sam@example.com	securepassword	0	
3	samol_big	samol@example.com	securepassword5	0	
\.


--
-- TOC entry 3354 (class 0 OID 16513)
-- Dependencies: 220
-- Data for Name: user_courses_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_courses_course ("userId", "courseId") FROM stdin;
\.


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 214
-- Name: chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chapter_id_seq', 1, false);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 216
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_id_seq', 1, false);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);


--
-- TOC entry 3192 (class 2606 OID 16493)
-- Name: chapter PK_275bd1c62bed7dff839680614ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY (id);


--
-- TOC entry 3194 (class 2606 OID 16500)
-- Name: course PK_bf95180dd756fd204fb01ce4916; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 16517)
-- Name: user_courses_course PK_c0795b2733bf088882aa84663cd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_courses_course
    ADD CONSTRAINT "PK_c0795b2733bf088882aa84663cd" PRIMARY KEY ("userId", "courseId");


--
-- TOC entry 3198 (class 2606 OID 16512)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 16502)
-- Name: course UQ_ac5edecc1aefa58ed0237a7ee4a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "UQ_ac5edecc1aefa58ed0237a7ee4a" UNIQUE (title);


--
-- TOC entry 3199 (class 1259 OID 16519)
-- Name: IDX_d67262674f71493825eb35e2e2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d67262674f71493825eb35e2e2" ON public.user_courses_course USING btree ("courseId");


--
-- TOC entry 3200 (class 1259 OID 16518)
-- Name: IDX_e99d8f99eff1a45a772b11060e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e99d8f99eff1a45a772b11060e" ON public.user_courses_course USING btree ("userId");


--
-- TOC entry 3203 (class 2606 OID 16520)
-- Name: chapter FK_b56f1474e3c40c58be083a7bdfd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT "FK_b56f1474e3c40c58be083a7bdfd" FOREIGN KEY ("courseId") REFERENCES public.course(id) ON DELETE CASCADE;


--
-- TOC entry 3204 (class 2606 OID 16530)
-- Name: user_courses_course FK_d67262674f71493825eb35e2e2c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_courses_course
    ADD CONSTRAINT "FK_d67262674f71493825eb35e2e2c" FOREIGN KEY ("courseId") REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3205 (class 2606 OID 16525)
-- Name: user_courses_course FK_e99d8f99eff1a45a772b11060e5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_courses_course
    ADD CONSTRAINT "FK_e99d8f99eff1a45a772b11060e5" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-02-01 16:48:24

--
-- PostgreSQL database dump complete
--

