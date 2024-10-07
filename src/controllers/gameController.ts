import Game, { IGame } from "../models/Game";
import { Request, Response, NextFunction } from "express";
import jsonWebToken from 'jsonwebtoken';

export const getGames = async (): Promise<void> => {
    await Game.find();
}