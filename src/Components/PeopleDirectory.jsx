import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Table, Pagination, Container, Modal } from 'react-bootstrap';
import { CiSearch, CiFilter } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './PeopleDirectory.css';
import axios from "axios";
import StatusBadge from './StatusBadge';
import './FilterModal.css';

const PeopleDirectory = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [teams, setTeams] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [members, setMembers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const rowsPerPage = 10; 
    const [currentPage, setCurrentPage] = useState(1);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [rolesExpanded, setRolesExpanded] = useState(false);
    const [teamsExpanded, setTeamsExpanded] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get('https://66fb96058583ac93b40c4dc6.mockapi.io/api/post');
            const formattedMembers = res.data.map(member => ({
                ...member,
                teams: Array.isArray(member.teams) ? member.teams : [],
            }));
            setMembers(formattedMembers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const sendData = async (e) => {
        e.preventDefault();
        const memberData = { image, name, role, email, teams };

        if (isEditing) {
            try {
                const res = await axios.put(`https://66fb96058583ac93b40c4dc6.mockapi.io/api/post/${editingMemberId}`, memberData);
                setMembers(members.map(member => (member.id === editingMemberId ? res.data : member)));
            } catch (error) {
                console.error("Error updating member:", error);
            }
        } else {
            try {
                const res = await axios.post('https://66fb96058583ac93b40c4dc6.mockapi.io/api/post', memberData);
                setMembers([...members, res.data]);
            } catch (error) {
                console.error("Error adding new member:", error);
            }
        }
        resetForm();
    };

    const resetForm = () => {
        setImage("");
        setName("");
        setRole("");
        setEmail("");
        setTeams([]);
        setModalOpen(false);
        setIsEditing(false);
        setEditingMemberId(null);
    };

    const handleEdit = (member) => {
        setImage(member.image);
        setName(member.name);
        setRole(member.role);
        setEmail(member.email);
        setTeams(member.teams);
        setEditingMemberId(member.id);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        axios.delete(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${id}`)
            .then(() => {
                setMembers(members.filter(member => member.id !== id));
            })
            .catch(error => console.error("Error deleting member:", error));
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
    const paginatedMembers = filteredMembers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleRoles = () => setRolesExpanded(!rolesExpanded);
    const toggleTeams = () => setTeamsExpanded(!teamsExpanded);

    const handleRoleChange = (role) => {
        setSelectedRoles((prev) =>
            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
        );
    };

    const handleTeamChange = (team) => {
        setSelectedTeams((prev) =>
            prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
        );
    };

    const handleCloseFilterModal = () => {
        setShowFilterModal(false);
    };

    return (
        <Container>
            <section className='border border-1 border-secondary px-2 mt-4' style={{ borderRadius: '10px', height: '125vh' }}>
                <div className="header-container">
                    <p className="team-members-title">Team Members 
                        <div className="rounded-pill px-3 ms-2 ps-2 pe-2" style={{ color: '#6941C6', backgroundColor: '#DDD5EE', border: '2px solid #6941C6', fontSize: "12px", marginLeft: '2px', justifyContent: 'space-evenly' }}>
                            {filteredMembers.length} Users
                        </div>
                    </p>

                    <div className="actions-container">
                        <InputGroup style={{ height: "2.5rem", width: "20rem" }}>
                            <FormControl
                                placeholder="Search by name or email"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <InputGroup.Text>
                                <CiSearch />
                            </InputGroup.Text>
                        </InputGroup>
                        <CiFilter style={{ fontSize: "2rem", cursor: "pointer" }} onClick={() => setShowFilterModal(true)} />
                        <button className="add-member-button" onClick={() => setModalOpen(true)}>
                            + Add Members
                        </button>
                    </div>
                </div>

                {/* Modal for Adding Member */}
                {isModalOpen && (
                    <Modal show={isModalOpen} onHide={() => setModalOpen(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{isEditing ? "Edit Member" : "Add Member"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={sendData}>
                                <div className="mb-4">
                                    <input
                                        style={{justifyContent:'center'}}
                                        type="text"
                                        className="form-control custom-input"
                                        id="image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="Image URL"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        className="form-control custom-input"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <select
                                        className="form-control custom-select"
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Product Designer">Product Designer</option>
                                        <option value="Product Manager">Product Manager</option>
                                        <option value="Frontend Developer">Frontend Developer</option>
                                        <option value="Backend Developer">Backend Developer</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <select
                                        className="form-control custom-select"
                                        id="teams"
                                        value={teams}
                                        onChange={(e) => setTeams(Array.from(e.target.selectedOptions, option => option.value))}
                                        multiple
                                        required
                                    >
                                        <option value="">Select Team(s)</option>
                                        <option value="Design">Design</option>
                                        <option value="Product">Product</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Technology">Technology</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                )}

                {/* Filter Modal */}
                <Modal show={showFilterModal} onHide={handleCloseFilterModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="filters">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={rolesExpanded}
                                    onChange={toggleRoles}
                                />
                                <label onClick={toggleRoles}>Roles</label>
                                {rolesExpanded && (
                                    <div className="options">
                                        {['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer'].map((role) => (
                                            <div key={role}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRoles.includes(role)}
                                                    onChange={() => handleRoleChange(role)}
                                                />
                                                <label>{role}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={teamsExpanded}
                                    onChange={toggleTeams}
                                />
                                <label onClick={toggleTeams}>Teams</label>
                                {teamsExpanded && (
                                    <div className="options">
                                        {['Design', 'Product', 'Marketing', 'Technology'].map((team) => (
                                            <div key={team}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTeams.includes(team)}
                                                    onChange={() => handleTeamChange(team)}
                                                />
                                                <label>{team}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="select-button" onClick={handleCloseFilterModal}>
                            SELECT
                        </button>
                    </Modal.Footer>
                </Modal>

                {/* Table for Displaying Members */}
                <div className="people-table-container mt-4">
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Teams</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedMembers.map((member) => (
                                <tr key={member.id} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={member.image} alt={member.name} className="rounded-circle me-2" style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
                                            <div>
                                                <div>{member.name}</div>
                                                <div className="text-muted">@{member.name.split(' ')[0].toLowerCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <StatusBadge status={member.status} />
                                    </td>
                                    <td>{member.role || 'Developer'}</td>
                                    <td>{member.email || 'example@gmail.com'}</td>
                                    <td>
                                    <div className="d-flex flex-wrap align-items-center">
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: '#6941C6', backgroundColor: '#f8f5fe', border: '2px solid #e6d6fa', fontSize: '0.8rem' }}>
                      Design
                    </div>
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: '#175cc7', backgroundColor: '#eff8ff', border: '2px solid #b1ddff', fontSize: '0.8rem' }}>
                      Product
                    </div>
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: '#3537c9', backgroundColor: '#edf3ff', border: '2px solid #c6d7f8', fontSize: '0.8rem' }}>
                      Marketing
                    </div>
                    <div className="rounded-pill fw-bold d-flex justify-content-center align-items-center mx-1 px-2" style={{ color: 'black', backgroundColor: '#f9fafc', border: '2px solid #e6e7eb', fontSize: '0.8rem' }}>
                      +4
                    </div>
                  </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-md" onClick={() => handleDelete(member.id)} aria-label={`Delete ${member.name}`}>
                                            <RiDeleteBinLine />
                                        </button>
                                        <button className="btn btn-md" onClick={() => handleEdit(member)} aria-label={`Edit ${member.name}`}>
                                            <FiEdit2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev 
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1} className=".pagination-prev "
                        >
                            <FaArrowLeft /> Prev
                        </Pagination.Prev>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next 
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next <FaArrowRight />
                        </Pagination.Next>
                    </Pagination>
                </div>
            </section>
        </Container>
    );
};

export default PeopleDirectory;
